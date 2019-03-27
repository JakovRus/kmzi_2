import numpy
import math

from binary_matrix import BinaryMatrix

def matrix_rank(bin_data: str, matrix_size=32):
    shape = (matrix_size, matrix_size)
    n = len(bin_data)
    block_size = int(matrix_size * matrix_size)
    num_m = math.floor(n / (matrix_size * matrix_size))
    block_start, block_end = 0, block_size

    if num_m > 0:
        max_ranks = [0, 0, 0]
        for im in range(num_m):
            block_data = bin_data[block_start:block_end]
            block = numpy.zeros(len(block_data))
            for i in range(len(block_data)):
                if block_data[i] == '1':
                    block[i] = 1.0
            m = block.reshape(shape)
            ranker = BinaryMatrix(m, matrix_size, matrix_size)
            rank = ranker.compute_rank()
            
            if rank == matrix_size:
                max_ranks[0] += 1
            elif rank == (matrix_size - 1):
                max_ranks[1] += 1
            else:
                max_ranks[2] += 1
            
            block_start += block_size
            block_end += block_size

        coeffs =  [0.2887880950866029, 0.5775761901732058, 0.1336357147401913]

        chi = 0.0
        for i in range(len(coeffs)):
            chi += pow((max_ranks[i] - coeffs[i] * num_m), 2.0) / (coeffs[i] * num_m)
        p_val = math.exp(-chi / 2)
        return p_val
    else:
        return -1.0