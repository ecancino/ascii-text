#!/usr/bin/env node
'use strict';

import fs from 'fs';
import meow from 'meow';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

const cli = meow(`
  Usage
    $ ascii-names <text> <font>

  Options:
    --gallery, -g  Prints text with all fonts

  Examples
    $ ascii-names Eduardo "AMC Thin"
    AMC Thin
     .-..--. .-..-.   .-.   .-. .-..-..-. .-..-.   .-..-.   .-..-..-.
    | | ~~  | | ~.-. | |   | | | | ~ | | | | ~.-. | | ~.-. | | ~ | |
    | | _   | |  | | | |   | | | |.-.| | | |.-.~  | |  | | | |   | |
    | |\`-'  | |  | | | |   | | | | ~ | | | | ~.-. | |  | | | |   | |
    | | __  | | _\`-' | | _ | | | |   | | | |  | | | | _\`-' | | _ | |
    \`-'\`--' \`-'\`-'   \`-'\`-'\`-' \`-'   \`-' \`-'  \`-' \`-'\`-'   \`-'\`-'\`-'
`, {
  g: 'gallery'
});

let [text, font] = cli.input,
  gallery = cli.flags.g || cli.flags.gallery;

if (!gallery) {
  if (text) {
    showText({ text, font });
  } else {
    showMenu();
  }
} else {
  showAll(text);
}

function showAll(text) {
  readFile('./fonts.txt', (err, data) =>
    data.split('\n').forEach(font =>
      showText({ text, font })
    )
  );
}

function showText({ text, font }) {
  figlet.text(
    text,
    { font: font || 'AMC Razor' },
    (err, graffiti) => console.log(chalk.red(font), '\n', graffiti)
  );
}

function readFile(file, callback) {
  return fs.readFile(file, 'utf8', callback);
}

function showOptions(err, data) {
  inquirer.prompt([
    { type: 'input', name: 'text', message: 'Text to print' },
    { type: 'list', name: 'font', message: 'Select a font', choices: data.split('\n')}
  ]).then(showText);
}

function showMenu() {
  readFile('./fonts.txt', showOptions);
}
