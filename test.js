import test from 'ava';
import fn from './';

const invalidArticleId = '';
const invalidPrivateKey = '';

const validArticleId = 'bbbbbbbb-aaaa-bbbb-aaaa-bbbbbbbbbbbb';
const validPrivateKey = '-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEA1151UdP3Fve2OpZdg7R6r14MzvwmR4Xw0ptjI3uXYxdmb7CHSn3wKdfzlH3RYo4Hncu6uaIsanXXisHaayhn9j8egsMQUPf41EdV452JlMLSm+fxYqUZOCyq6XIis5SaU7FermE5bF0gagS9vkgBq1A5caH64Ww+sWmnhFQ1fwjxwNjaYUKmWu6rB662qJXdXad1e4omgws94Ok65oAemxx58YawkDWbm9T831Q/DXXYb75C22qtFuKIX4u9iAzUghkB1Nm2sUOHAvLPLXsAoiwvibE8ChlXEYsNf4Yyc0hJUdKpyNudlg1UIGZvhL4xLeA+qlv4t/Kz1vvfQNeTwQIDAQABAoIBAQCud/vsjR03Avch4RvijPtyQ2t25neQK2ZbBrw6S23pPVSjmEsRQpKjIylVGtPb1hk/cIJUzZbTq6Ev7Din5HTL3Hg4EBOQtEFknmFq4f1JgMYivLQkaIDUrALM2MRZ3EFlGWQNOf/N1Gdk23BmzGhlwri2YDUgFpN3H5MwNROdU0FEj519B4hwHB3isalARiFOYyFrYptcFz1ybGj3FIzRX+e10vhpqP6Y9PD2iAxr6HN2+o2+g5l3flAthNFLUO42K7o12cnSvvoa7X++twvUSYNyq7sSXt/cI6H0kMz6bmDx/8L4ClTlPalnXIaBEJE0EQCmXSzFN32RUTCDk6X9AoGBAPuc6bTMtzIXI/NMGuJxu/VtPyjCzFGcehgYlFdtO8WaeLNE8/m+7CBfdc+N8sAY5A4T+/BrM00bfI++DZAFLTvN0m3vEdzwHuAIXxe2cpDVlLMeXdF/azTs7t0G+bffJt6nw4LFqnfPaSaTRp7NjmdbF5rWI0humpqxyUpqjpJjAoGBANsfxMMQxry+odUvlI/ph7CNWUy23tk2gG/kYGMPHqt1H7uEfDu2DQmaWl/yFxgVvq4+oABCGkyFNaXKjmjDH9Ek5/mPV9bW5o02A4dXXlTi8chJSYDqNk7MdB5qrWK/ZVOdHlxgo564nJhDzD9XgBdWW7MuIHU3WjJhGLU1KQiLAoGAJF2JaZgs4hB2IbPeLtxBTjd76Wg+H41+F/11cy1WdjjdOQu+N1pgxk0FufnKG/l8/Ivm3digkYRnfF77ltUotHwK7difvE74J2kOVV8JL+WumDTLWnwQApY777YSYYDfHU8h8sSe3rIbgHfIvSr4affAcaCBePaDYdhQP3EnKgECgYAlzh5ZdUyEhfNP36ynA6iIemqcxLRAD5orM+C5VoN5G3UFGj+A4dDwBjRvd0oqup2yXFWolb8J0rXFy+O0CW403EQ1l1iVVXBjjp0fPaClzp3ea16GImKKR9YE5WzSq6jkuyfg0j+Ig9tondHgX81WuWyKxnuNHaavKHdl1C0nLwKBgQDJKvRBdM92RokTJB+XW4fEWxndIYw0d6zdEZw/rtFHZd6VljeRrULkaT5UHQQVwKi7aD4bUjJGbxNNajzdLaKSvkibZhp42Dms9VZLTCdx9QPUe6iEfp1sXfawREEf2XjiKtxWsiZjST8jQAdTJB25nInK2w75Fi6aQCiwmUBSjA==-----END RSA PRIVATE KEY-----';

test('creating a cookie should throw for invalid values', t => {
	t.throws(fn.bind(fn,invalidArticleId, validArticleId), Error);
	t.throws(fn.bind(fn,validArticleId, invalidPrivateKey), Error);
	t.end();
});

test('creating a cookie should return a string', t => {
	t.is(typeof fn(validArticleId, validPrivateKey), 'string');
	t.end();
});

test('creating a cookie should return a string starting with GuestPass', t => {
	t.is(fn(validArticleId, validPrivateKey).substr(0,9), 'GuestPass');
	t.end();
});
