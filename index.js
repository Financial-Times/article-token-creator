"use strict";

var uuid = require('uuid');
var NodeRSA = require('node-rsa');
var fs = require('fs');
var path = require('path');
var TextEncoder = require('text-encoding').TextEncoder;
var atob = require('base-64').decode;
var btoa = require('base-64').encode;
var escape = require('base64-url').escape;

function createCookie(name,value,domain,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}

	if (domain) {
		return name+"="+value+expires+"; path=/; "+"domain="+domain;
	} else {
		return name+"="+value+expires+"; path=/";
	}
}

function isValidPem(key) {
	return /-----BEGIN RSA PRIVATE KEY-----\S+-----END RSA PRIVATE KEY-----/.test(key);
}

function isValidUuid(uuid) {
	return /([a-z0-9]{8})-([a-z0-9]{4})-([a-z0-9]{4})-([a-z0-9]{4})-([a-z0-9]{12})/.test(uuid);
}

module.exports = function createCookieString(articleUUID, privateKey, publicKeyUrl) {
	if (isValidUuid(articleUUID)) {
		if (isValidPem(privateKey)) {
			var key = new NodeRSA(privateKey);

			var now = new Date();
			var oneMonthFromNow = new Date(new Date(now).setMonth(now.getMonth() + 1));

			var guestpasses = [
				{
					"uid": articleUUID,
					"token": uuid.v4(),
					"expires": oneMonthFromNow
				}
			];

			var s = JSON.stringify(guestpasses);

			var guestpassesUTF8 = new TextEncoder('utf-8').encode(s);

			var signature = escape(btoa(atob(key.sign(s, 'base64'))));
			var encodedSignature = signature;

			var guestpassCookieValue = btoa(JSON.stringify({
				"guestpasses": guestpasses,
				"publickey": publicKeyUrl || "https://registration.ft.com/guestpass/publickey/dcbdf3be-fb40-4939-aff7-e31b668384ea",
				"signature": encodedSignature
			}));

			return createCookie('GuestPass', guestpassCookieValue, '.ft.com', 30);
		} else {
			throw new Error('Not a valid private key. Needs to be a string that is in the format of a PEM file containing only a private key.');
		}
	} else {
		throw new Error('Not a valid Article ID. Needs to be a string that is in the format of a UUID.');
	}
};
