# importing modules
from random import random
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib import colors
import pdfplumber
import json
import sys
from email.mime import base
from unicodedata import name
import mysql.connector
import math



def getDatabase():
  mycursor = None
  try:
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="AsswordPay69",
      database = "UCSC_courses"
    )
    mycursor = mydb.cursor()
  except:
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="AsswordPay69"
    )
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE UCSC_courses")
  return(mycursor, mydb)

def initTable():
  mycursor = None
  try:
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="AsswordPay69",
      database = "UCSC_courses"
    )
    mycursor = mydb.cursor()
  except:
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="AsswordPay69"
    )
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE UCSC_courses")
  try:
    mycursor.execute("DROP TABLE COURSES2")
  except:
    print("TABLE ALREADY GONE")
  #mycursor.execute("CREATE TABLE COURSES (ID INT AUTO_INCREMENT PRIMARY KEY, Name varchar (255))")
  mycursor.execute("CREATE TABLE COURSES2 (ID INT AUTO_INCREMENT PRIMARY KEY, Name varchar (255), Class_Desc varchar (10000), Quarters varchar (255), Prereqs varchar (1000), Instructors varchar (1000), Credits int, GE VARCHAR (255), Repeatable int)")
  print("FINISHED")
# self.name = name
# self.desc = ""
# self.quarters = []
# self.prereqs = []
# self.instructors = []
# self.credits = 0
# self.ge = []
# self.repeatable = False

def testAdd(mycursor, mydb):
  print("ADD COURSE START")
  # base_insert_statement = "insert into COURSES (Name, Class_Desc, Quarters, Prereqs, Instructors, Credits, GE, Repeatable) values (%s, %s, %s, %s, %s, %d, %s, %d)"
  base_insert_statement = "insert into COURSES2 (Name) values (%s)"
  insertVal = ["TEST"]
  mycursor.execute(base_insert_statement, insertVal)  
  mydb.commit()
  mycursor.execute("SELECT * FROM COURSES2")
  allRows = mycursor.fetchall()
  for row in allRows:
    print(row)  


def testSelect(mycursor, mydb):
  mycursor.execute("SELECT Name FROM COURSES WHERE GE LIKE '%PR%' AND Name LIKE '%OAKS%'")
  allRows = mycursor.fetchall()
  for row in allRows:
    print(row)  
  print("NUMBER OF GE CLASSES: ", len(allRows))



def addCourses(courseList, mycursor, mydb):
  print("ADD COURSE START")
  base_insert_statement = "insert into COURSES2 (Name, Class_Desc, Quarters, Prereqs, Instructors, Credits, GE, Repeatable) values (%s, %s, %s, %s, %s, %s, %s, %s)"
  #base_insert_statement = "insert into COURSES (Name, Class_Desc, Quarters, Prereqs, Instructors, GE) values (%s, %s, %s, %s, %s, %s)"
  #base_insert_statement = "insert into COURSES (Name) values (%s)"
  for x in courseList:
    print("ADD COURSE")
    course = courseList[x]
    quarters = str(course.quarters).strip('[]')
    prereqs = str(course.prereqs).strip('[]')
    instructors = str(course.instructors).strip('[]')
    ge = str(course.ge).strip('[]')
    repeatable = 1 if course.repeatable else 0
    #insertVal = [course.name]
    #insertVal = [course.name, course.desc, quarters, prereqs, instructors, ge]
    insertVal = [course.name, course.desc, quarters, prereqs, instructors, str(course.credits), ge, str(repeatable)]
    mycursor.execute(base_insert_statement, insertVal)  
    mydb.commit()
  mycursor.execute("SELECT * FROM COURSES2")
  allRows = mycursor.fetchall()
  for row in allRows:
    print(row)


def makeTestPdfs(mycursor, mydb, maxClasses, minClasses, tests):
  print(tests)
  sql = mycursor.execute("SELECT Name, GE FROM COURSES2 ORDER BY GE, Name")
  sql = mycursor.fetchall()
  nameNumPair = []
  for x in sql:
    temp = x[0].split(" ")
    nameNumPair.append([temp[0], temp[1], x[1]])
  # totalText = ""
  # with pdfplumber.open('D:/python/ucsc_courses_website/frontend/src/SSR_TSRPT(4).pdf') as pdf:
  #   for x in pdf.pages:
  #     totalText += x.extract_text()
  for x in range(tests):
    makePdf(x, nameNumPair, maxClasses, minClasses)

def makePdf(num, nameNumPair, maxClasses, minClasses):
  GEStr = "" 
  fileName = 'D:/python/ucsc_courses_website/server/uploads/'+str(num)+".pdf"
  documentTitle = 'sample'
  title = 'Technology'
  subTitle = 'The largest thing now!!'
  # textLines = totalText.split("\n")
  pdf = canvas.Canvas(fileName)
  textLines = []

  
#name_beg number desc float float float gibberish
#gibberish


#OAKS  189 Bldg Website SocChange 2.00 0.00 0.000
#Page: 5 of 5

  for x in range(math.floor(random()*(maxClasses-minClasses)+minClasses)):
    (f, GEStr) = makeTextLine(nameNumPair, GEStr)
    textLines.append(f)
  text = pdf.beginText(40, 680)
  text.setFont("Courier", 18)
  for line in textLines:
    text.textLine(line)
  pdf.drawText(text)
  pdf.save()
  myText = open(r'D:/python/ucsc_courses_website/test/pytxts/'+str(num)+'.txt','w')
  myText.write(GEStr)
  myText.close()


def randStr(len, maxWordLen, randLen):
  retStr = ""
  for x in range(len):
    for x in range(maxWordLen):
      retStr += chr(math.floor(random()*26) + 65)
      if math.floor(random()*maxWordLen) == 0:
        break
    retStr += ' '
    if (randLen and math.floor(random()*len) == 0):
      break
  return retStr


def makeTextLine(nameNumPair, GEStr):
  randVal = math.floor(random()* len(nameNumPair))
  desc = randStr(5, 8, False)
  gibbrish = randStr(8, 10, True)
  spacing = "        "
  retStr = ""
  retStr += str(nameNumPair[randVal][0])
  retStr += spacing
  retStr += str(nameNumPair[randVal][1])
  retStr += spacing
  retStr += desc
  retStr += spacing
  retStr += str(math.floor(random()*10))+"."+str(math.floor(random()*10))+str(math.floor(random()*10))
  retStr += spacing
  retStr += str(math.floor(random()*10))+"."+str(math.floor(random()*10))+str(math.floor(random()*10))
  retStr += spacing
  retStr += chr(math.floor(random()*26) + 65) if random()*2>1 else " "
  retStr += spacing
  retStr += str(math.floor(random()*10))+"."+str(math.floor(random()*10))+str(math.floor(random()*10))
  retStr += spacing if math.floor(random() * 2)==0 else ""
  retStr += gibbrish
  if(nameNumPair[randVal][2]!=""):
    # print(nameNumPair[randVal][2])
    # print(nameNumPair[randVal][2].strip("'"))
    GEStr += nameNumPair[randVal][2].strip("'")
    GEStr += ","
  return (retStr, GEStr)
