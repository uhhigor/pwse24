import unittest
from solution import solution
class TestStringMethods(unittest.TestCase):
    def testAdd2(self):
        self.assertTrue(solution(2,-2),4)
if __name__ == '__main__':
    unittest.main()
