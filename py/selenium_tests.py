import datetime
import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

startTime = datetime.datetime.now()
print "================================================================="
print " INITIALIZING AUTOMATED TESTING FOR MAXWELL HUNTER'S GITHUB PAGE"
print "================================================================="
print
print


# set global variables for permution conditions

# set global production modes
ENVIRONMENTS = {
        'Debug': (
            'file:///Users/Treehouse/Documents/Github/mhunterak.github.io/'),
        # 'Alpha': 'none',
        # 'Beta': 'none',
        'Production': 'http://mhunterak.github.io/',
    }
BROWSERS = {
    'Chrome': webdriver.Chrome(),
    'Firefox': webdriver.Firefox()
    }
# list of tuples (width, height)
SCREEN_SIZES = [
    # MOBILE - PORTRAIT
    (375, 667),
    (414, 736),
    # MOBILE - LANDSCAPE
    (667, 375),
    (736, 414),
    # DESKTOP
    (1024, 768),
    (1280, 800),
    (1366, 768),
    (1920, 1080),
    ]

# set global variable for browser by string
BROWSER = 'Netscape'
# set global variable for environment by string
ENVIRONMENT = 'Testing'
# has more options besides debug or prodo
# set global variable for storing current browser dimensions
SCREEN_SIZE = [
    0,  # height
    0,  # width
    ]


# FUNCTIONS

# We don't need the function, but this is what it would look like
'''
def selectEnvironmentByString(string):
    return ENVIRONMENTS[string]
'''


def setWindowSize(height, width):
    SCREEN_SIZE = [int(height), int(width)]
    driver.set_window_position(0, 0)
    driver.set_window_size(height, width)
    return SCREEN_SIZE


def loadPage(page):
    driver.get(ENVIRONMENTS[ENVIRONMENT]+page+'.html')


def loadPageTruncated(page):
    driver.get(ENVIRONMENTS[ENVIRONMENT]+page)


def mouseToAndClick(element):
    ActionChains(driver).move_to_element(element).click(element).perform()


def clearScreen():
    driver.get(driver.current_url)


# TEST CLASSES
class TestIndex(unittest.TestCase):
    def testIndex_NameInTitle(self):
        loadPage('index')

        # Test that my name is in the title
        self.assertTrue('Maxwell Hunter' in driver.title)

    def testIndex_Visibility(self):
        loadPage('index')

        # Test that colors button is hidden
        self.assertFalse(driver.find_element_by_css_selector(
            '#colors',).is_displayed())
        # test that demosButton is is_displayed
        self.assertTrue(driver.find_element_by_css_selector(
            '#demosButton').is_displayed())

    def testIndex_DropdownStartsHidden(self):
        loadPage('index')

        # Test that dropdown starts hidden
        self.assertFalse(
            driver.find_element_by_css_selector('#demos').is_displayed())

    def testIndex_HoverAndDropdownIsShown(self):
        loadPage('index')
        demosButton = driver.find_element_by_css_selector('#demosButton')
        # action: move mouse over Javascript Demos
        mouseToAndClick(demosButton)

        # Test that dropdown is shown now
        self.assertTrue(
            driver.find_element_by_css_selector('#demos').is_displayed())


class TestWeather(unittest.TestCase):
    def testWeather_Title(self):
        loadPageTruncated('weather.html?city=Portland')
        # Test that the title is accurate
        self.assertEqual(('Weather' in driver.title), True)

    def testWeather_city(self):
        loadPageTruncated('weather.html?city=Portland')
        locationTitle = driver.find_element_by_css_selector('#locationTitle')
        # Test that the city is displayed
        self.assertEqual(('Portland' in locationTitle.text), True)

    def testWeather_Input(self):
        loadPageTruncated('weather.html?city=Portland')
        locationTitle = driver.find_element_by_css_selector('span')
        # press esc key to remove the alert window
        ActionChains(driver).send_keys(
            'ESCAPE')
        # wait for page to load
        time.sleep(3)
        # assert 'Portland' starts in the locationTitle
        self.assertEqual(('Portland' in locationTitle.text), True)
        # Test that the input works
        # input 'Seattle' in text field, and press enter
        driver.find_element(
            by='id',
            value='newCity'
            ).send_keys("Seattle", Keys.ENTER)
        # wait for page to load
        time.sleep(5)
        # assert 'Seattle' ends in the locationTitle
        self.assertEqual(('Seattle' in locationTitle.text), True)


class TestResume(unittest.TestCase):
    def testResume_Title(self):
        loadPage('resume')

        # Test that the title is accurate
        self.assertTrue(('Dynamic Resume' in driver.title))

    def testResume_Visibility(self):
        loadPage('resume')
        jobTitle = driver.find_element_by_css_selector('#jobTitle')

        # Test that #container is displayed
        self.assertTrue(
            driver.find_element_by_css_selector('#container').is_displayed())
        # Test that the jobTitle selector is displayed
        self.assertTrue(jobTitle.is_displayed())

    def testResume_DropdownVisibilityFunctionality_Init(self):
        loadPage('resume')
        jobDesc = driver.find_element_by_css_selector('#jobDesc')
        jobTitle = driver.find_element_by_css_selector('#jobTitle')
        CEButton = driver.find_element_by_css_selector('#CE')

        # just in case the mouse initializes on top of the jobDesc element,
        # move the mouse away
        ActionChains(driver).move_to_element(jobTitle)
        # Test that dropdown buttons are hidden
        self.assertFalse(
            driver.find_element_by_css_selector('#dropdown').is_displayed())
        self.assertFalse((CEButton).is_displayed())

        # move the mouse away
        ActionChains(driver).move_to_element(jobDesc)

    def testResume_DropdownVisibilityFunctionality_Action(self):
        loadPage('resume')
        jobDesc = driver.find_element_by_css_selector('#jobDesc')
        jobTitle = driver.find_element_by_css_selector('#jobTitle')
        CEButton = driver.find_element_by_css_selector('#CE')

        # Test that if the selector is hovered,
        # the dropdown buttons are displayed
        ActionChains(driver).move_to_element(jobDesc).perform()
        jobTitle.location_once_scrolled_into_view
        ActionChains(driver).move_to_element(jobTitle).click().perform()
        ActionChains(driver).move_to_element(CEButton).perform()

        self.assertTrue(
            driver.find_element_by_css_selector('#dropdown').is_displayed())
        self.assertTrue((CEButton).is_displayed())

    def testResume_DropdownButtonsFunctionality(self):
        loadPage('resume')
        jobDesc = driver.find_element_by_css_selector('#jobDesc')
        jobTitle = driver.find_element_by_css_selector('#jobTitle')
        CEButton = driver.find_element_by_css_selector('#CE')

        # when first loaded, the page will show the most recent profile.
        # in this case, the DSE profile
        self.assertTrue("Python Developer" in jobTitle.text)

        # when you move to the job title, the buttons appear,
        # then you click the CE button
        ActionChains(driver).move_to_element(jobDesc).perform()
        jobTitle.location_once_scrolled_into_view
        ActionChains(driver).move_to_element(jobTitle).perform()
        CEButton.location_once_scrolled_into_view
        ActionChains(
            driver).move_to_element(CEButton).click(CEButton).perform()

        # the CSE profile displays
        self.assertTrue("Customer Engineer Profile" in jobTitle.text)

    def testResume_hidePicture(self):
        loadPage('resume')
        picture = driver.find_element_by_css_selector('img')
        width = driver.get_window_size()['width']

        # if the screen width is under 600 px, the picture is hidden
        if width <= 600:
            self.assertFalse(picture.is_displayed())
            # if width > 600, the picture is displayed
        else:
            self.assertTrue(picture.is_displayed())

    def testResume_hideParagraph(self):
        loadPage('resume')
        width = driver.get_window_size()['width']
        paragraph = driver.find_element_by_css_selector('h3')

        # if width <= 600, the paragraph is not displayed
        if width <= 600:
            self.assertFalse(paragraph.is_displayed())
        # if width > 600, the paragraph is displayed
        else:
            self.assertTrue(paragraph.is_displayed())


class TestCalculator(unittest.TestCase):

    # if the javascript is loaded correctly, the display will read 00.00
    def testCalculator_blankDisplay(self):
        loadPage('calc')
        clearScreen()

        display = driver.find_element_by_css_selector('#display')
        self.assertEqual(display.text, "00.00")

    # TEST PAGE BUTTONS (clicked with mouse)
    def testCalculator_buttons_7(self):
        loadPage('calc')
        clearScreen()

        display = driver.find_element_by_css_selector('#display')
        # the fourth button displayed in the top left corner should be the 7
        button7 = driver.find_elements_by_css_selector('button')[4]
        # click the 7 button
        mouseToAndClick(button7)

        self.assertEqual(display.text, u"7")

    def testCalculator_buttons_2plus2(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        # get buttons for 2, +, and enter
        button2 = driver.find_elements_by_css_selector('button')[13]
        buttonPlus = driver.find_elements_by_css_selector('button')[19]
        buttonEquals = driver.find_elements_by_css_selector('button')[18]

        # press 2, then +, then 2, then =
        mouseToAndClick(button2)
        mouseToAndClick(buttonPlus)
        mouseToAndClick(button2)
        mouseToAndClick(buttonEquals)

        self.assertEqual(display.text, u"4")

    def testCalculator_buttons_2x2(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        # get buttons for 2, *, and enter
        button2 = driver.find_elements_by_css_selector('button')[13]
        buttonTimes = driver.find_elements_by_css_selector('button')[11]
        buttonEquals = driver.find_elements_by_css_selector('button')[18]

        # press 2, then *, then 2, then =
        mouseToAndClick(button2)
        mouseToAndClick(buttonTimes)
        mouseToAndClick(button2)
        mouseToAndClick(buttonEquals)

        self.assertEqual(display.text, u"4")

    def testCalculator_buttons_7x7(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        # get buttons for 7, *, and enter
        button7 = driver.find_elements_by_css_selector('button')[4]
        buttonTimes = driver.find_elements_by_css_selector('button')[11]
        buttonEquals = driver.find_elements_by_css_selector('button')[18]

        # press 7, then *, then 7, then =
        mouseToAndClick(button7)
        mouseToAndClick(buttonTimes)
        mouseToAndClick(button7)
        mouseToAndClick(buttonEquals)

        self.assertEqual(display.text, u"49")

    def testCalculator_buttons_5x5x5(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        # get buttons for 5, *, and enter
        button5 = driver.find_elements_by_css_selector('button')[9]
        buttonTimes = driver.find_elements_by_css_selector('button')[11]
        buttonEquals = driver.find_elements_by_css_selector('button')[18]

        # press 5,
        mouseToAndClick(button5)
        # Then *, then 5, then =, then *, then 5
        for _ in range(0, 2):
            mouseToAndClick(buttonTimes)
            mouseToAndClick(button5)
            mouseToAndClick(buttonEquals)
        self.assertEqual(display.text, u"125")

    def testCalculator_buttons_3plus3plus3(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        # get buttons for 3, +, and =
        button3 = driver.find_elements_by_css_selector('button')[14]
        buttonPlus = driver.find_elements_by_css_selector('button')[19]
        buttonEquals = driver.find_elements_by_css_selector('button')[18]

        # press 3,
        mouseToAndClick(button3)
        # Then +, then 3, then =, then +, then 3
        for _ in range(0, 2):
            mouseToAndClick(buttonPlus)
            mouseToAndClick(button3)
            mouseToAndClick(buttonEquals)

        self.assertEqual(display.text, u"9")

    def testCalculator_buttons_5plus7plus(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        button5 = driver.find_elements_by_css_selector('button')[9]
        button7 = driver.find_elements_by_css_selector('button')[4]
        buttonPlus = driver.find_elements_by_css_selector('button')[19]

        mouseToAndClick(button5)
        mouseToAndClick(buttonPlus)
        mouseToAndClick(button7)
        mouseToAndClick(buttonPlus)

        self.assertEqual(display.text, u"5 + 7")

    def testCalculator_buttons_5plus7C(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        button5 = driver.find_elements_by_css_selector('button')[9]
        buttonPlus = driver.find_elements_by_css_selector('button')[19]
        button7 = driver.find_elements_by_css_selector('button')[4]
        buttonC = driver.find_elements_by_css_selector('button')[0]

        mouseToAndClick(button5)
        mouseToAndClick(buttonPlus)
        mouseToAndClick(button7)
        mouseToAndClick(buttonC)

        self.assertEqual(display.text, u"00.00")

    def testCalculator_buttons_numberAfterEquals(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        button2 = driver.find_elements_by_css_selector('button')[13]
        button5 = driver.find_elements_by_css_selector('button')[9]
        button7 = driver.find_elements_by_css_selector('button')[4]
        buttonPlus = driver.find_elements_by_css_selector('button')[19]
        buttonEquals = driver.find_elements_by_css_selector('button')[18]

        mouseToAndClick(button5)
        mouseToAndClick(buttonPlus)
        mouseToAndClick(button7)
        mouseToAndClick(buttonEquals)
        mouseToAndClick(button2)

        self.assertEqual(display.text, u"2")

    # TEST KEYS

    def testCalculator_keys_2plus2(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')

        # press 2, then +, then 2
        ActionChains(driver).send_keys('2').send_keys('+').send_keys(
            '2').send_keys(Keys.ENTER).perform()

        self.assertEqual(display.text, u"4")

    def testCalculator_keys_2x2(self):
        loadPage('calc')
        clearScreen()

        display = driver.find_element_by_css_selector('#display')
        # press 2, then +, then 2
        ActionChains(driver).send_keys('2').send_keys('x').send_keys(
            '2').send_keys(Keys.ENTER).perform()

        self.assertEqual(display.text, u"4")

    def testCalculator_keys_7x7(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')
        # press 7, then x, then 7

        ActionChains(driver).send_keys('7').send_keys('x').send_keys(
            '7').send_keys(Keys.ENTER).perform()

        self.assertEqual(display.text, u"49")

    def testCalculator_keys_5x5x5(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')

        ActionChains(driver).send_keys(
            '5').send_keys('x').send_keys('5').send_keys(
            Keys.ENTER).send_keys(
            'x').send_keys('5').send_keys(Keys.ENTER).perform()

        self.assertEqual(display.text, u"125")

    # TODO: build out decimal functionality so that these tests pass.

    def testCalculator_keys_3plus3plus3(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')

        ActionChains(driver).send_keys(
            '3').send_keys('+').send_keys('3').send_keys(
            Keys.ENTER).send_keys('+').send_keys('3').send_keys(
            Keys.ENTER).perform()

        self.assertEqual(display.text, u"9")

    def testCalculator_keys_5plus7plus(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')

        ActionChains(driver).send_keys(
            '5').send_keys('+').send_keys('7').send_keys('+').perform()

        self.assertEqual(display.text, u"5 + 7")

    def testCalculator_keys_5plus7C(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')

        ActionChains(driver).send_keys(
            '5').send_keys('+').send_keys('7').send_keys('c').perform()

        self.assertEqual(display.text, u"00.00")

    def testCalculator_keys_numberAfterEnter(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')

        ActionChains(driver).send_keys(
            '5').send_keys('+').send_keys('7').send_keys(
            Keys.ENTER).send_keys('2').perform()

        self.assertEqual(display.text, u"2")

    '''
    #FAILING TEST - We don't have functionality for the decimal button yet,
    # which also doesn't exist
    def testCalculator_keys_piDecimcal(self):
        loadPage('calc')
        clearScreen()

        display = driver.find_element_by_css_selector('#display')
        ActionChains(driver).send_keys(
            '3').send_keys('.').send_keys('1').send_keys(
            '4').perform()
        self.assertEqual(display.text, u"3.14")
    '''

    def testCalculator_keys_5div7plus2000(self):
        loadPage('calc')
        clearScreen()
        display = driver.find_element_by_css_selector('#display')

        ActionChains(driver).send_keys(
            '5').send_keys('/').send_keys('ESCAPE').send_keys('7').send_keys(
            Keys.ENTER).send_keys('+').send_keys('2').send_keys(
            '0').send_keys('0').send_keys('0').send_keys(Keys.ENTER).perform()

        self.assertEqual(display.text, u"2,000.7142857142858")

###############


def buildAndRunTests(height, width):
    print
    print "TESTING ON {} IN {} AT {}x{}  ".format(
        BROWSER.upper(),
        ENVIRONMENT.upper(),
        width,
        height,
        )
    print

    setWindowSize(height, width)

    suite = unittest.TestLoader().loadTestsFromTestCase(TestIndex)
    # weather tests not working, probably because of location permissions
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestWeather))
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestResume))
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestCalculator))

    # sample code for adding new class of tests to the test suite
    #    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(#NewTestClass))

    # run tests
    unittest.TextTestRunner(verbosity=2).run(suite)


# loop order is browsers, then releases, then screen sizes
if __name__ == '__main__':
    # loop over browsers
    for browser in BROWSERS.keys():
        # BROWSERS is now a dictionary of the driver init functions.
        driver = BROWSERS[browser]
        BROWSER = browser

        # loop over releases
        for release in ENVIRONMENTS.keys():
            # setting the global ENVIRONMENT variable to a string
            # avoids an extra 'if' statement
            ENVIRONMENT = release

            # loop over screen sizes
            for (height, width) in SCREEN_SIZES:
                buildAndRunTests(height, width)

    # cleanup
    endTime = datetime.datetime.now()
    print
    print 'TESTS COMPLETED IN {}'.format(endTime - startTime)
    driver.quit()

else:
    endTime = datetime.datetime.now()
    print
    print 'TESTS LOADED IN {}'.format(endTime - startTime)
