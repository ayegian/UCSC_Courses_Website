# importing modules
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib import colors
import pdfplumber
import json
import sys


totalText = ""

with pdfplumber.open('D:/python/ucsc_courses_website/frontend/src/SSR_TSRPT(4).pdf') as pdf:
    for x in pdf.pages:
        totalText += x.extract_text()


fileName = 'D:/python/ucsc_courses_website/frontend/src/sample.pdf'
documentTitle = 'sample'
title = 'Technology'
subTitle = 'The largest thing now!!'
textLines = totalText.split("\n")
  

for x in textLines:
    print
# creating a pdf object
pdf = canvas.Canvas(fileName)
  
# setting the title of the document
  
# registering a external font in python
# creating the title by setting it's font 
# and putting it on the canvas
#name_beg number desc float float float gibberish
#gibberish


#OAKS  189 Bldg Website SocChange 2.00 0.00 0.000
#Page: 5 of 5



# textline and for loop
text = pdf.beginText(40, 680)
text.setFont("Courier", 18)
for line in textLines:
    text.textLine(line)
pdf.drawText(text)
  
# drawing a image at the 
# specified (x.y) position
  
# saving the pdf
pdf.save()