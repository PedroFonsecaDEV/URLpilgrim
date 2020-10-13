# URLpilgrim

A NODE CLI program to search for URLs inside multiple or individual files and check their STATUS as well as check URLs directly.

Check for Status|
----------------|
200|
400|
404|
 
Supports URLs only using protocols:
* https://

* http://

or just:

* www

Arguments without protocol (www.example.com) will be tested as HTTPS://www.example.com

## INSTALL:
Global installation:
```
npm i -g urlpilgrim
```
## HOW TO USE:

SCAN and CHECK URLS inside files:
```
urlpilgrim file1.txt file2.html 
```
CHECK URLs directly(-u sets the URL MODE):
```
urlpilgrim http://www.example1.com www.example2.ca http://www.example3.com -u
```
### OPTIONAL FLAGS:

#### JSON OUTPUT:

```
-j --json
```

#### FILTER RESULTS:

```
-good returns just urls with "good" status.
-bad  returns just urls with "bads" status.
-unk  returns just urls with "unknown" status.
```
### Version:
```
urlpilgrim -v  
```
### Help:
```
urlpilgrim
```
FOR MORE INFORMATION: [URLpilgrim DOC](https://medium.com/@pedrofonsecadev/url-pilgrim-doc-a7090b4c6c53)
