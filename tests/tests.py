import sys
from matrix_rank import matrix_rank
from cumulative_sums import cumulative_sums
from random_excursions import random_excursions

test_name = sys.argv[1]
file_name = sys.argv[2]

content = open('./data/' + file_name, "r").read()

if test_name == 'rank':
    p_value = matrix_rank(content)
elif test_name == 'cumsum': 
    p_value = cumulative_sums(content)
else:
    p_value = random_excursions(content)[4]

print(round(p_value, 6))    
