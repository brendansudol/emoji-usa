import math


def tf(word, counts):
    return counts[word] / sum(counts.values())


def n_containing(word, counts_list):
    return sum(1 for counts in counts_list if word in counts)


def idf(word, counts_list):
    return math.log(len(counts_list) / (1 + n_containing(word, counts_list)))


def tfidf(word, counts, counts_list):
    return tf(word, counts) * idf(word, counts_list)
