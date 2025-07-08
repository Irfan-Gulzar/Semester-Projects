#include <iostream>
#include <windows.h>
#include <queue>
using namespace std;

void display()
{
    cout << "*****************************************************************************************************" << endl
         << endl;
    cout << "\t\t ============== WELCOME TO THE WORD PUZZLE GAME =============== " << endl;
    cout << " Guess the hidden correct word from the puzzle to win this Game " << endl;
    cout << " 1. You have 3 chances to guess the correct word " << endl;
    cout << " 2. For every correct Guess score will be added by 1. " << endl;
    cout << " *Hint: Its a fruit Name:)" << endl;
    cout << "=====================================================================" << endl
         << endl;
}

int gameFunction(const string &secretWord)
{
    char hiddenWord[10][10];
    char character;
    int randomIndex;
    int chance = 3;

    for (int i = 0; i < 10; i++)
    {
        for (int j = 0; j < 10; j++)
        {
            randomIndex = rand() % 26;     // generate random number 0-25
            character = 'a' + randomIndex; // dealing with ASCII values
            hiddenWord[i][j] = character;
        }
    }

    if (secretWord.length() % 2 == 0)
    {
        // placing word Horizontally
        int row = rand() % 10;
        int col = rand() % (10 - secretWord.length());
        for (int i = 0; i < secretWord.length(); i++)
        {
            hiddenWord[row][col + i] = secretWord[i];
        }
    }
    else
    {
        // placing word vertically
        int row = rand() % (10 - secretWord.length());
        int col = rand() % 10;
        for (int i = 0; i < secretWord.length(); i++)
        {
            hiddenWord[row + i][col] = secretWord[i];
        }
    }

    cout << "\t==> Hidden Word Puzzle <== " << endl
         << endl;
    for (int i = 0; i < 10; i++)
    {
        for (int j = 0; j < 10; j++)
        {
            cout << " " << hiddenWord[i][j] << " ";
            Sleep(100);
        }
        cout << endl;
    }

    cout << endl
         << endl;
    cout << "Chances : " << chance << endl;

    string guess;
a:
    if (chance > 0)
    {
        cout << "Enter your guess: ";
        cin >> guess;
        if (guess == secretWord)
        {
            cout << "Congratulations! You guessed the correct word!" << endl;
            return 1;
        }
        else
        {
            --chance;
            cout << "\nChances Left : " << chance << endl;
            goto a;
        }
    }
    else
    {
        cout << "Sorry, that's not correct. The correct word was: " << secretWord << endl;
        return 0;
    }
}

int main()
{

    string name;
    cout << "Enter your name: ";
    getline(cin, name);

    int score = 0;
    char choice;

    queue<string> words; // used Queue

    string allWords[10] = {"apple", "banana", "grape", "orange", "kiwi", "mango", "peach", "pear", "plum", "berry"};

    for (int i = 0; i < 10; i++)
    {
        int randIndex = rand() % 10;
        words.push(allWords[randIndex]);
    }

    do
    {
        if (words.empty())
        {
            cout << "\nNo more words left in the game. Thanks for playing!" << endl;
            break;
        }

        system("cls");
        cout << " Player : " << name << "\t Score : " << score << endl;
        display();

        string currentWord = words.front(); // ? Get the word from queue
        words.pop();                        // ? Remove the word after using

        score += gameFunction(currentWord);

        cout << "Would you like to play again? (y/n): ";
        cin >> choice;
    } while (choice != 'n');

    system("cls");
    cout << "*************************************************************************************************" << endl;
    cout << "Your Score is : " << score << endl;
    cout << "*********************************** Game Over ****************************************" << endl;

    return 0;
}
