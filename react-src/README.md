# Product Extraction

The product extraction team is incrementally adding functionality to support the ability to test in isolation.


# Doubles

## 1. Generate Cert
git
Run the script, answer the prompts.

Some of the steps will require you to authenticate with you local admin credentials. They will update your keychain with the certs created.


```shell
./react-src/scripts/doubles-cert-creation/generate_cert_files.sh
```

Current defaults are for `ford.com` and `localhost.ford.com` -- this will change real soon


## 2. Update `hosts` file

The domain used (`localhost.ford.com`) must be in your `/etc/hosts` file. Add this line to the file

```
127.0.0.1	localhost.ford.com

```

## 3. Run the Double Server

```shell
npm run start:doubles
```

You can check the doubles are running by opening a browser to the domain being served (e.g. https://localhost.ford.com:8001/ )

You should see a list of the endpoints being hosted.


# Project

## Directory Structure

- `./react-src/doubles`: Doubled dependencies and related utilities.
	- `./fma`: FMA functionality replaced by call with custom `bundle.js` implementation.
	- `./fs`: Handle `/cat-with-ci-access-token`endpoint.
	- `./ial`: Serve doubled endpoints to handle IAL requests.
	- `./user-profile`: Provides doubling for user profile service.


## Other files (@todo)
- `devices.key`: -
- `localhost.ford.com.crt`: -
- `localhost.ford.com.csr`: -
- `rootCA.key`: -
- `rootCA.pem`: -
- `rootCA.key`: -
- `server.js`: -
- `v3.ext`: -


## Techniques

#### Javascript resource replacement
Replace a JavaSript resource provided over http with a custom version.

example: FMA, `./react-src/doubles/fma/bundle.js`


### Custom endpoint handler
Handle an HTTP request with a registered endpoint on a doubled server.

example: FS, `./react-src/doubles/fs/index.js`


### JSON fixture
Store a fixture representing a request response in JSON and provide it as the response body when requested (via doubled HTTP server).

example: User Profile Service, `./react-src/doubles/user-profile/doubles/userProfileGet.json`


## Scripts

`npm run start:doubles` - Run the doubles server at https://localhost.ford.com:8001/




## General Notes

## Gotchas

### Security certificate warning

Due to using the https protocol, when using certain browsers load a page for the first time, the browser prompts for explicit permission to access this page.

When first accessing new hosts such as the double server (http://localhost.ford.com:8001) or the react-act (https://localhost.ford.com:3000) it is advised to visit them directly in the browser to proceed.

To do so, after receiving the "Your connection is not private" warning, click the "Advanced" button and follow the link at the bottom to "Proceed to localhost.ford.com (unsafe)".