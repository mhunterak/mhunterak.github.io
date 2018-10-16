import sys
print "AUTOMATED TESTING FOR MAXWELL HUNTER'S GITHUB PAGE"

import datetime
#import unittest framework
import unittest
import sys

print;sys.stdout.write("initializing")
sys.stdout.flush()
startTime = datetime.datetime.now()

#import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

sys.stdout.write('.') #increment itialization progress
sys.stdout.flush()

ENVIRONMENT = 'Testing' #set global variable for environment by string
#has more options besides debug or prodo
###set global variables for permution conditions
ENVIRONMENTS = { #Set global production modes
		'Debug' : 'file:///Users/Treehouse/Documents/Github/mhunterak.github.io/', 
		# 'Alpha'
		# 'Beta'
		'Production' : 'http://mhunterak.github.io/',
	} 
BROWSERS = ['Chrome', 'Firefox']
SCREEN_SIZE = [
	0, #height
	0 #width
	]
SCREEN_SIZES = [ #set global screen sizes for testing - list of tuples (height, width)
	#MOBILE - PORTRAIT
	(375, 667),
	(414, 736),
	#MOBILE - LANDSCAPE
	(667, 375),
	(736, 414),
	#DESKTOP
	(1024, 768),
	(1280, 800),
	(1366, 768),
	(1920, 1080),
	] 

DEBUG = True #set global variable for testing as True by default


sys.stdout.write('.') #increment itialization progress
sys.stdout.flush()

###FUNCTIONS

def buildChrome():
	return webdriver.Chrome()

def buildFirefox():
	return webdriver.Firefox()

# We don't need the function, but this is what it would look like
'''
def selectEnvironmentByString(string):
	return ENVIRONMENTS[string]
'''

def setWindowSize(height, width):
	print; print "SETTING DISPLAY RESOLUTION TO {} x {}".format(height, width); print;
	SCREEN_SIZE = [height, width]
	driver.set_window_position(0, 0)
	driver.set_window_size(height, width)

def loadPage(page):
	driver.get(ENVIRONMENTS[ENVIRONMENT]+page+'.html')

#TEST CLASSES
class TestIndex(unittest.TestCase):
	def testIndex_NameInTitle(self):
		#load the page we're working on
		loadPage('index')
		#test that my name is in the title
		self.assertTrue('Maxwell Hunter' in driver.title)

	def testIndex_Visibility(self):
		#load the page we're working on
		loadPage('index')
		#test that colors button is hidden
		self.assertFalse(driver.find_element_by_css_selector('#colors',).is_displayed())

		# test that demosButton is is_displayed
		self.assertTrue(driver.find_element_by_css_selector('#demosButton').is_displayed())

	def testIndex_DropdownStartsHidden(self): 
		#load the page we're working on
		loadPage('index')
		#test that dropdown starts hidden
		self.assertFalse((driver.find_element_by_css_selector('#demos')).is_displayed())

	def testIndex_HoverAndDropdownIsShown(self):
		#load the page we're working on
		loadPage('index')
		#action: move mouse over Javascript Demos
		ActionChains(driver).move_to_element(
			(driver.find_element_by_css_selector('#demosButton'))).perform()
		#test that dropdown is shown now
		self.assertTrue((driver.find_element_by_css_selector('#demos')).is_displayed())

'''
class TestWeather(unittest.TestCase):
	def testWeather_Title(self):
		loadPage('weather')
		#test that the title is accurate
		self.assertEqual(('Weather' in driver.title), True)

	def testWeather_Input(self):
		loadPage('weather')

		#test that the input works
		#input 'Seattle' in text field, and press enter
		driver.find_element(
			by='id',
			value='newCity'
			).send_keys("Seattle", Keys.ENTER)
		self.assertEqual(1,1)

	def testAPI(self):
		try:
		    element = WebDriverWait(driver, 10).until(
		    	driver.text_to_be_present_in_element_value(
			        driver.find_element(
						by='id',
						value='newCity'
						),
			        "Seattle"
			        )
		    	)
		finally:
		    driver.quit()
'''

class TestResume(unittest.TestCase):
	def testResume_Title(self):
		#load the page we're working on
		loadPage('resume')
		#test that the title is accurate
		self.assertTrue(('Dynamic Resume' in driver.title))

	def testResume_Visibility(self):
		#load the page we're working on
		loadPage('resume')
		jobTitle = driver.find_element_by_css_selector('#jobTitle')


		#test that #container is displayed
		self.assertTrue((driver.find_element_by_css_selector('#container')).is_displayed())

		#test that the selector is displayed
		self.assertTrue(jobTitle.is_displayed())

	def testResume_DropdownVisibilityFunctionality(self):
		#load the page we're working on
		loadPage('resume')
		jobDesc = driver.find_element_by_css_selector('#jobDesc')
		jobTitle = driver.find_element_by_css_selector('#jobTitle')
		CEButton = driver.find_element_by_css_selector('#CE')
		#test that dropdown buttons are hidden
		self.assertFalse((driver.find_element_by_css_selector('#dropdown')).is_displayed())
		self.assertFalse((CEButton).is_displayed())

		#test that if the selector is hovered, the dropdown buttons are displayed
		ActionChains(driver).move_to_element(jobDesc).perform()
		jobTitle.location_once_scrolled_into_view
		ActionChains(driver).move_to_element(jobTitle).click().perform()
		ActionChains(driver).move_to_element(CEButton).perform()

		self.assertTrue((driver.find_element_by_css_selector('#dropdown')).is_displayed())
		self.assertTrue((CEButton).is_displayed())

	def testResume_DropdownButtonsFunctionality(self):
		#load the page we're working on
		loadPage('resume')
		jobDesc = driver.find_element_by_css_selector('#jobDesc')
		jobTitle = driver.find_element_by_css_selector('#jobTitle')
		CEButton = driver.find_element_by_css_selector('#CE')
		#when first loaded, the page will show the most recent profile.
		# in this case, the DSE profile
		self.assertTrue("Developer Support Engineer Profile" in jobTitle.text)
		#when you move to the job title, the buttons appear, then you click the CE button
		ActionChains(driver).move_to_element(jobDesc).perform()
		jobTitle.location_once_scrolled_into_view
		ActionChains(driver).move_to_element(jobTitle).perform()
		CEButton.location_once_scrolled_into_view
		ActionChains(driver).move_to_element(CEButton).click(CEButton).perform()
		# the CSE profile displays
		self.assertTrue("Customer Engineer Profile" in jobTitle.text)

	def testResume_hidePicture(self):
		#load the page we're working on
		loadPage('resume')
		picture = driver.find_element_by_css_selector('img')
		width = driver.get_window_size()['width']
		#if the screen width is under 600 px, the picture is hidden
		if width <= 600:
			self.assertFalse(picture.is_displayed())
			#if width > 600, the picture is displayed
		else:
			self.assertTrue(picture.is_displayed())

	def testResume_hideParagraph(self):
		width = driver.get_window_size()['width']
		#load the page we're working on
		loadPage('resume')
		paragraph = driver.find_element_by_css_selector('h3')
		#if width <= 600, the paragraph is not displayed
		if width <= 600:
			self.assertFalse(paragraph.is_displayed())
			#if width > 600, the paragraph is displayed
		else:
			self.assertTrue(paragraph.is_displayed())

class TestCalculator(unittest.TestCase):
	#if the javascript is loaded correctly, the display will read 00.0
	def testCalculator_blankDisplay(self):
		#load the page we're working on
		loadPage('calc')
		display = driver.find_element_by_css_selector('#display')
		self.assertEqual(display.text, "00.0")

	def testCalculator_buttons_7(self):
		#load the page we're working on
		loadPage('calc')
		#load the display element
		display = driver.find_element_by_css_selector('#display')
		# the first button displayed in the top left corner should be the 7
		button = driver.find_element_by_css_selector('button')
		# click the 7 button
		ActionChains(driver).move_to_element(
			button).click(button).perform()
		self.assertEqual(display.text, u"7")

	def testCalculator_keys_7x7(self):
		#load the page we're working on
		loadPage('calc')
		#load the display element
		display = driver.find_element_by_css_selector('#display')
		#press 7, then x, then 7
		ActionChains(driver).send_keys('7').send_keys('x').send_keys(
			'7').send_keys(Keys.ENTER).perform()
		self.assertEqual(display.text, u"49")

	def testCalculator_keys_2x2(self):
		#load the page we're working on
		loadPage('calc')
		#load the display element
		display = driver.find_element_by_css_selector('#display')
		#press 2, then +, then 2
		ActionChains(driver).send_keys('2').send_keys('x').send_keys(
			'2').send_keys(Keys.ENTER).perform()
		self.assertEqual(display.text, u"4")

	def testCalculator_keys_5x5x5(self):
		#load the page we're working on
		loadPage('calc')
		#load the display element
		display = driver.find_element_by_css_selector('#display')
		ActionChains(driver).send_keys(
			'5').send_keys('x').send_keys('5').send_keys(
			Keys.ENTER).send_keys(
			'x').send_keys('5').send_keys(Keys.ENTER).perform()

		self.assertEqual(display.text, u"125")

	#TODO: plus key isn't working in firefox


def buildAndRunTests():
	#assign global value to the argument

	print "TESTING {} ".format(ENVIRONMENT); print

	suite = unittest.TestLoader().loadTestsFromTestCase(TestIndex)
	#	weather tests aren't working right, probably because of the location permissions
	#	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestWeather))
	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestResume))

	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestCalculator))

	#sample code for adding new class of tests to the test suite
	#	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(#NewTestClass))
	
	#run tests
	unittest.TextTestRunner(verbosity=2).run(suite)

sys.stdout.write('. Done') #itialization progress complete
sys.stdout.flush()
print;print 

#loop order is browsers, then releases, then screen sizes
if __name__ == '__main__':
	#loop over browsers
	#sets the global browser to a certain browser type to run tests
	for browser in BROWSERS: 
		print 'Loading New browser' #itialization progress complete
		if browser == 'Chrome':
			print "--> TESTING IN CHROME <--"; print
			driver = buildChrome()
		elif browser == 'Firefox':
			print "--> TESTING IN FIREFOX <--"; print
			driver = buildFirefox()
		#loop over releases
		for release in ENVIRONMENTS.keys() :
			#setting the global ENVIRONMENT variable to a string avoids an extra if statement
			ENVIRONMENT = release
			#loop over screen sizes
			for (height, width) in SCREEN_SIZES: 
				setWindowSize(height, width)
				buildAndRunTests()
	#cleanup
	endTime = datetime.datetime.now()
	print; print 'TESTS COMPLETED IN {}'.format(endTime - startTime)
	driver.quit()
else:
	endTime = datetime.datetime.now()
	print; print 'TESTS LOADED IN {}'.format(endTime - startTime)

