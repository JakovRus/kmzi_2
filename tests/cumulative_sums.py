import numpy
import scipy.stats as sst

def cumulative_sums(bin_data: str, method="forward"):
    n = len(bin_data)
    counts = numpy.zeros(n)
    
    if method != "forward":
        bin_data = bin_data[::-1]

    ix = 0
    for char in bin_data:
        sub = 1
        if char == '0':
            sub = -1
        if ix > 0:
            counts[ix] = counts[ix - 1] + sub
        else:
            counts[ix] = sub
        ix += 1

    abs_max = numpy.max(numpy.abs(counts))

    start = int(numpy.floor(0.25 * numpy.floor(-n / abs_max) + 1))
    end = int(numpy.floor(0.25 * numpy.floor(n / abs_max) - 1))
    terms_one = []
    for k in range(start, end + 1):
        sub = sst.norm.cdf((4 * k - 1) * abs_max / numpy.sqrt(n))
        terms_one.append(sst.norm.cdf((4 * k + 1) * abs_max / numpy.sqrt(n)) - sub)

    start = int(numpy.floor(0.25 * numpy.floor(-n / abs_max - 3)))
    end = int(numpy.floor(0.25 * numpy.floor(n / abs_max) - 1))
    terms_two = []
    for k in range(start, end + 1):
        sub = sst.norm.cdf((4 * k + 1) * abs_max / numpy.sqrt(n))
        terms_two.append(sst.norm.cdf((4 * k + 3) * abs_max / numpy.sqrt(n)) - sub)

    p_val = 1.0 - numpy.sum(numpy.array(terms_one))
    p_val += numpy.sum(numpy.array(terms_two))
    return p_val