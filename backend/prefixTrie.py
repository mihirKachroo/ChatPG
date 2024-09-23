class TrieNode:
    def __init__(self):
        # Dictionary to store the children of the node
        self.children = {}
        # Boolean flag to indicate the end of a word
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """
        Insert a word into the trie.
        """
        node = self.root
        for char in word:
            # If the character is not in the children of the node, create a new node
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        # Mark the end of the word
        node.is_end_of_word = True

    def search(self, word):
        """
        Search for a word in the trie.
        Returns True if the word is found and False otherwise.
        """
        node = self.root
        for char in word:
            # If the character is not found, the word is not present
            if char not in node.children:
                return False
            node = node.children[char]
        # Check if it's the end of a word
        return node.is_end_of_word

    def starts_with(self, prefix):
        """
        Check if there is any word in the trie that starts with the given prefix.
        Returns True if a prefix exists, False otherwise.
        """
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

    def delete(self, word):
        """
        Delete a word from the trie. Returns True if the word was deleted, False otherwise.
        """
        def _delete(node, word, depth):
            if depth == len(word):
                # If at the end of the word, unset the is_end_of_word flag
                if not node.is_end_of_word:
                    return False  # Word not found
                node.is_end_of_word = False
                return len(node.children) == 0  # If no children, node can be deleted
            char = word[depth]
            if char not in node.children:
                return False  # Word not found
            child_node = node.children[char]
            should_delete_child = _delete(child_node, word, depth + 1)

            # If true, delete the child node from the current node
            if should_delete_child:
                del node.children[char]
                return len(node.children) == 0  # Return true if current node has no other children
            return False

        return _delete(self.root, word, 0)

    def blacklist_words_from_file(self, file_path):
        """
        Load a large quantity of blacklisted words from a file.
        Each word in the file should be separated by a newline.
        """
        with open(file_path, 'r') as file:
            for word in file:
                word = word.strip()  # Remove any leading/trailing whitespace
                if word:
                    self.insert(word)
