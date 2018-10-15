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

###set global variables for permution conditions
ENVIRONMENTS = { #Set global production modes
		'Debug' : 'file:///Users/Treehouse/Documents/Github/mhunterak.github.io/', 
		# 'Alpha'
		# 'Beta'
		'Production' : 'http://mhunterak.github.io/',
	} 
BROWSERS = ['Chrome', 'Firefox']
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
ENVIRONMENT = 'Testing' #set global variable for environment by string
#has more options besides debug or prodo


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

def setWidowSize(width, height):
	print; print "SETTING DISPLAY RESOLUTION TO {} x {}".format(height, width); print;
	driver.set_window_position(0, 0)
	driver.set_window_size(width, height)

def loadPage(page):
	driver.get(ENVIRONMENTS[ENVIRONMENT]+page+'.html')

#TEST CLASSES
class TestIndex(unittest.TestCase):
	def testIndex_NameInTitle(self):
		#load the page we're working on
		loadPage('index')
		#test that my name is in the title
		self.assertEqual(('Maxwell Hunter' in driver.title), True)

	def testIndex_Visibility(self):
		#load the page we're working on
		loadPage('index')
		#test that colors button is hidden
		self.assertEqual(driver.find_element_by_css_selector('#colors',).is_displayed(), False)

		# test that demosButton is is_displayed
		self.assertEqual((driver.find_element(
			by='id',
			value='demosButton'
			)).is_displayed(), True)

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
		loadPage('resume')
		jobDesc = driver.find_element_by_css_selector('#jobDesc')
		jobTitle = driver.find_element_by_css_selector('#jobTitle')
		CEButton=driver.find_element_by_css_selector('#CE')
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
		loadPage('resume')
		jobDesc = driver.find_element_by_css_selector('#jobDesc')
		jobTitle = driver.find_element_by_css_selector('#jobTitle')
		CEButton=driver.find_element_by_css_selector('#CE')
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

def buildAndRunTests():
	#assign global value to the argument

	print "TESTING {} ".format(ENVIRONMENT); print

	suite = unittest.TestLoader().loadTestsFromTestCase(TestIndex)
	#	weather tests aren't working right, probably because of the location permissions
	#	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestWeather))
	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestResume))

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
				setWidowSize(height, width)
				buildAndRunTests()
	#cleanup
	endTime = datetime.datetime.now()
	print; print 'TESTS COMPLETED IN {}'.format(endTime - startTime)
	driver.quit()
else:
	endTime = datetime.datetime.now()
	print; print 'TESTS LOADED IN {}'.format(endTime - startTime)

