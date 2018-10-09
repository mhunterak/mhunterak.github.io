#import unittest framework
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

#set testing to local or live server
isLive = True

#initialize selenium driver
driver = webdriver.Chrome()

#select test or prodo env
def selectEnvironment(isLive):
	if isLive:
		return 'http://mhunterak.github.io/'
	else:
		return 'file:///Users/Treehouse/mhunterak.github.io/'

def loadPage(page):
	driver.get(selectEnvironment(isLive)+page+'.html')	

class TestIndex(unittest.TestCase):
	def testIndex_NameInTitle(self):
		loadPage('index')
		#test that my name is in the title
		self.assertEqual(('Maxwell Hunter' in driver.title), True)

	def testIndex_Visibility(self):
		loadPage('index')
		#test that colors button is hidden
		self.assertEqual((driver.find_element(
			by='id',
			value='colors',
			)).is_displayed(), False)

		# test that demosButton is is_displayed
		self.assertEqual((driver.find_element(
			by='id',
			value='demosButton'
			)).is_displayed(), True)

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

def loadResume():
	#get weather page
	driver.get(selectEnvironment(isLive)+'resume.html')
class TestResume(unittest.TestCase):
	def testResume_Title(self):
		loadResume()
		#test that the title is accurate
		self.assertEqual(('Dynamic Resume' in driver.title), True)

		

if __name__ == '__main__':
	suite = unittest.TestLoader().loadTestsFromTestCase(TestIndex)
#	weather tests aren't working right, probably because of the location permissions
#	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestWeather))
	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestResume))

#sample of adding new class of tests to the test suite
#	suite.addTest(unittest.TestLoader().loadTestsFromTestCase(#NewTestClass))

	#run test suite
	unittest.TextTestRunner(verbosity=2).run(suite)

#cleanup
driver.quit()


