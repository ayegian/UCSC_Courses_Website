from ctypes import sizeof
from database_test import *
from web_scraper_try import *
import os

# initTable()

def runShit():
    (cursor, db) = getDatabase()
    print("GOT DB")
    initTable()
    courseList = returnCourseList()
    print("GOT COURSES")
    addCourses(courseList, cursor, db)
    print("ADDED COURSES")

def runTest():
    (cursor, db) = getDatabase()
    print("GOT DB")
    testAdd(cursor, db)
    print("ADDED COURSES")

def makePDFs(minClasses, maxClasses, numTests):
    (cursor, db) = getDatabase()
    makeTestPdfs(cursor, db,minClasses,maxClasses,numTests)

def compareFiles():
    realStrs = []
    replStrs = []
    wrongDups = []
    for filename in os.listdir("D:/python/ucsc_courses_website/test/pytxts"):
        #print(filename)
        f = os.path.join("D:/python/ucsc_courses_website/test/pytxts", filename)
        # checking if it is a file
        if os.path.isfile(f) and os.path.getsize(f) > 0:
            openedFile = open(f)
            line = openedFile.readlines()[0]
            realStrs.append(line)
            openedFile.close()
    for filename in os.listdir("D:/python/ucsc_courses_website/test/jstxts"):
        f = os.path.join("D:/python/ucsc_courses_website/test/jstxts", filename)
        # checking if it is a file
        if os.path.isfile(f) and os.path.getsize(f) > 0:
            openedFile = open(f)
            line = openedFile.readlines()[0]
            replStrs.append(line)
            openedFile.close()
    for x in range(len(realStrs)):
        if realStrs[x] != replStrs[x]:
            wrongDups.append(x)
    if len(wrongDups) == 0:
        print("NO WRONG DUPS LEN: ", len(realStrs))
        return
    for x in wrongDups:
        print("Wrong dup ind: ", x)
        print("Real str: \n")
        print(realStrs[x])
        print("Repl str: \n")
        print(replStrs[x])
        print("\n\n")
                

print("START")

#makePDFs(10,40,500)

compareFiles()
# courseList.sort(key = lambda x: x.name)

print("BEGIN")
 
print("FINISH")