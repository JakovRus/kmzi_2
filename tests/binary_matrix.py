import numpy
import copy

class BinaryMatrix:
    def __init__(self, matrix, rows, cols):
        self.num_rows = rows
        self.num_cols = cols
        self.matrix = matrix
        self.m = min(rows, cols)

    def compute_rank(self):
        i = 0
        while i < self.m - 1:
            if self.matrix[i][i] == 1:
                self.perform_row_operations(i, True)
            else:
                found = self.find_unit_element_swap(i, True)
                if found == 1:
                    self.perform_row_operations(i, True)
            i += 1

        i = self.m - 1
        while i > 0:
            if self.matrix[i][i] == 1:
                self.perform_row_operations(i, False)
            else:
                if self.find_unit_element_swap(i, False) == 1:
                    self.perform_row_operations(i, False)
            i -= 1

        return self.determine_rank()

    def perform_row_operations(self, i, forward_elimination):
        if forward_elimination:
            j = i + 1
            while j < self.num_rows:
                if self.matrix[j][i] == 1:
                    self.matrix[j, :] = (self.matrix[j, :] + self.matrix[i, :]) % 2
                j += 1
        else:
            j = i - 1
            while j >= 0:
                if self.matrix[j][i] == 1:
                    self.matrix[j, :] = (self.matrix[j, :] + self.matrix[i, :]) % 2
                j -= 1

    def find_unit_element_swap(self, i, forward_elimination):
        row_op = 0
        if forward_elimination:
            index = i + 1
            while index < self.num_rows and self.matrix[index][i] == 0:
                index += 1
            if index < self.num_rows:
                row_op = self.swap_rows(i, index)
        else:
            index = i - 1
            while index >= 0 and self.matrix[index][i] == 0:
                index -= 1
            if index >= 0:
                row_op = self.swap_rows(i, index)
        return row_op

    def swap_rows(self, row_one, row_two):
        temp = copy.copy(self.matrix[row_one, :])
        self.matrix[row_one, :] = self.matrix[row_two, :]
        self.matrix[row_two, :] = temp
        return 1

    def determine_rank(self):
        rank = self.m
        i = 0
        while i < self.num_rows:
            all_zeros = 1
            for j in range(self.num_cols):
                if self.matrix[i][j] == 1:
                    all_zeros = 0
            if all_zeros == 1:
                rank -= 1
            i += 1
        return rank
