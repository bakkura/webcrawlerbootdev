const { normalizeURL } = require('./crawl.js');
const { getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL - domain is lowercase and # is removed', () => {
    const input = 'https://noDEJs.org/api/url.html#url-strings-and-url-objects';
    const actual = normalizeURL(input);
    const expected = 'nodejs.org/api/url.html';
    expect(actual).toEqual(expected);
});

test('normalizeURL - strips scheme', () => {
    const input = 'https://chat.openai.com/c/11d0bed6-00de-41e9-9703-712f20d3ac53';
    const actual = normalizeURL(input);
    const expected = 'chat.openai.com/c/11d0bed6-00de-41e9-9703-712f20d3ac53';
    expect(actual).toEqual(expected);
});

test('normalizeURL - removes trailing slash', () => {
    const input = 'https://www.google.com/';
    const actual = normalizeURL(input);
    const expected = 'www.google.com';
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML relative', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })