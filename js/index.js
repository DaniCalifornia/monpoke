const form = document.getElementById('form');
const output = document.getElementById('output');
const fileSelector = document.getElementById('file-selector');
const game = new Game();

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
}

async function processFile(file) {
  try {
    let commands = await readFileAsync(file);
    console.log(commands);
    processCommands(commands);
  } catch (err) {
    console.log(err);
  }
}

fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  processFile(fileList[0]);
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const commands = evt.target.command.value;

  processCommands(commands);

  evt.target.command.value = '';
});

function processCommands(input) {
  // split multi line commands by new line
  const commands = input.split('\n');

  // iterate through command(s)
  for (let command of commands) {
    if (!game.gameOver) {
      // split each command by word
      console.log(command);
      const splitCommand = command.split(' ');
      const key = splitCommand[0].trim();

      // CREATE team command
      if (key === 'CREATE') {
        const [create, teamId, monpokeId, hp, ap] = splitCommand;
        // find or create team with teamId
        const newTeam = game.findOrCreateTeam(teamId);

        // if team creation fails, exit game
        if (!newTeam || hp < 1 || ap < 1) {
          violation();
          break;
        }
        // if team is created successfully, add monopoke to team
        newTeam.addMonopoke(monpokeId, hp, ap);
        console.log('new team', newTeam);

        // add result of command to game output
        game.updateOutput(
          monpokeId + ' has been assigned to team ' + teamId + '!'
        );
      } // ATTACK command
      else if (key === 'ATTACK') {
        // if no monopoke chosen, exit game
        if (!game.attackReady()) {
          violation();
          break;
        }
        // game.nextTurn();
        const home = game.getTeam('home');
        const away = game.getTeam('away');
        const attacker = home.getChosenPoke();
        const enemy = away.getChosenPoke();
        enemy.takeHit(attacker.getAp());
        let output =
          attacker.getId() +
          ' attacked ' +
          enemy.getId() +
          ' for ' +
          attacker.getAp() +
          ' damage!';
        // check if enemy was defeated
        if (enemy.isDefeated()) {
          output += '\n' + enemy.getId() + ' has been defeated!';
          // check if team was defeated
          if (away.getActivePokeCount() < 1) {
            output += '\n' + home.getId() + ' is the winner!';
            game.endGame();
          }
        }

        game.updateOutput(output);
      } // ICHOOSEYOU command
      else if (key === 'ICHOOSEYOU') {
        const monoPokeId = splitCommand[1].trim();
        if (game.chooseMonpoke(monoPokeId)) {
          game.updateOutput(monoPokeId + ' has entered the battle!');
        } else {
          violation();
          break;
        }
      }
    }
  }
  output.innerText = game.getOutput();
}

function violation() {
  game.updateOutput('ERROR - exiting game');
  game.endGame();
}
