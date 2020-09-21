# URLpilgrim

A NODE CLI program to search for URLs inside multiple or individual files and check their STATUS as well as check URLs directly.

Version 0.1 Supports STATUS:

 \-200
 
 \-400
 
 \-404
 
Version 0.1 Supports URLs only using protocols:

\-"https://"

\-"http://"


#INSTALL:

> \>npm i -g urlpilgrim

#HOW TO USE:

SCAN and CHECK URLS inside files:

> \> urlpilgrim file1.txt file2.html 

CHECK URLs directly(-u):

-u: Set the URL MODE. 

> \> urlpilgrim www.example1.com http://example2.ca www.example3.com -u

Version:

> \> urlpilgrim -v  

Help:
> \> urlpilgrim

FOR MORE INFORMATION:

https://medium.com/@pedrofonsecadev/url-pilgrim-doc-a7090b4c6c53

Thanks.
