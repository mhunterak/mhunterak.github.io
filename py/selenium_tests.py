import sys
print "AUTOMATED TESTING FOR MAXWELL HUNTER'S GITHUB PAGE"


#import unittest framework
import unittest
import sys

print;sys.stdout.write("initializing")
sys.stdout.flush()


from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

sys.stdout.write('.') #increment itialization progress
sys.stdout.flush()

sys.stdout.write('.') #increment itialization progress
sys.stdout.flush()

DEBUG = True

def buildChrome():
	return webdriver.Chrome()
	driver = buildChrome()


def buildFirefox():
	return webdriver.Firefox()


#select test or prodo env
def selectEnvironment(debug):
	if not debug:
		return 'http://mhunterak.github.io/'
	else:
		return 'file:///Users/Treehouse/Documents/Github/mhunterak.github.io/'

def loadPage(page):
	driver.get(selectEnvironment(DEBUG)+page+'.html')	

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

	def testResumeVisibility(self):
		#load the page we're working on
		loadPage('resume')
		jobTitle = driver.find_element_by_css_selector('#jobTitle')


		#test that #container is displayed
		self.assertTrue((driver.find_element_by_css_selector('#container')).is_displayed())

		#test that the selector is displayed
		self.assertTrue(jobTitle.is_displayed())

	def testResumeDropdownVisibilityFunctionality(self):
		loadPage('resume')
		jobTitle = driver.find_element_by_css_selector('#jobTitle')
		CEButton=driver.find_element_by_css_selector('#CE')
		#test that dropdown buttons are hidden
		self.assertFalse((driver.find_element_by_css_selector('#dropdown')).is_displayed())
		self.assertFalse((CEButton).is_displayed())

		#test that if the selector is hovered, the dropdown buttons are displayed
		ActionChains(driver).move_to_element(jobTitle).click(jobTitle).perform()
		self.assertTrue((driver.find_element_by_css_selector('#dropdown')).is_displayed())
		self.assertTrue((CEButton).is_displayed())

	def testResumeDropdownButtonsFunctionality(self):
		loadPage('resume')
		jobTitle = driver.find_element_by_css_selector('#jobTitle')
		CEButton=driver.find_element_by_css_selector('#CE')
		#when first loaded, the page will show the most recent profile.
		# in this case, the DSE profile
		self.assertTrue("Developer Support Engineer Profile" in jobTitle.text)
		#when you move to the job title, the buttons appear, then you click the CE button
		ActionChains(driver).move_to_element(jobTitle).move_to_element(CEButton).click(CEButton).perform()
		# the CSE profile displays
		self.assertTrue("Customer Engineer Profile" in jobTitle.text)

def buildAndRunTests(debug):
	#assign global value to the argument
	selectEnvironment(debug)

	if debug:
		print "TESTING DEBUG "; print
	else:
		print "TESTING PRODO "; print

	suite = unittest.TestLoader().loadTestsFromTestCase(TestIndex)
	#	weather tests aren't working right, probably because of the location permissions
	#	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestWeather))
	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestResume))

	#sample of adding new class of tests to the test suite
	#	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(#NewTestClass))
	
	#run tests
	unittest.TextTestRunner(verbosity=2).run(suite)

sys.stdout.write('.') #increment itialization progress
sys.stdout.flush()

print;print #add new lines

if __name__ == '__main__':
	i = 0
	j = 0
	while i < 2:
		if i == 0:
			driver = buildChrome()
			print "--> TESTING IN CHROME <--"; print
		elif i == 1:
			driver = buildFirefox()
			print "--> TESTING IN FIREFOX <--"; print
		while j < 2:
			if j == 0: #DEBUG tests
				DEBUG = True
				buildAndRunTests(True)
				j += 1
			elif j == 1: #PRODO tests
				DEBUG = False
				buildAndRunTests(False)
				j = 2
		i += 1
		j = 0


#cleanup
driver.quit()
print;print "TESTS COMPLETE";print
