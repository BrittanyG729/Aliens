const messagesDiv = document.querySelector('#messages')
const attackBtn = document.querySelector('#attack-btn')
const retreatBtn = document.querySelector('#retreat-btn')

function appendMessage(msg) {
  messagesDiv.innerHTML += `
    <div class="message">
      ${msg}
    </div>
  `
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

function disableButtons(isDisable) {
  if (isDisable) {
    attackBtn.setAttribute('disabled', isDisable)
    retreatBtn.setAttribute('disabled', isDisable)
  } else {
    attackBtn.removeAttribute('disabled')
    retreatBtn.removeAttribute('disabled')
  }
}

class Spaceship {
    constructor(hull,firepower,accuracy,name,isAlien){
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
      this.name = name
      this.isAlien = isAlien
    }
  // make a loop and make a array of 6 aliens
  async attack(target) {
    // console.log(`ATTACKER: `, this)
    // console.log(`TARGET: `, target)
    disableButtons(true)
    await appendMessage(`${this.name} fired at ${target.name}`);
    if (Math.random() < this.accuracy) {
    // It was a hit
      await appendMessage("It was a hit!");
      target.hull -= this.firepower;
      if (target.hull <= 0) {
        // Target destroyed
        await appendMessage(`The hull of ${target.name} decreased to ${target.hull}.`);
        await appendMessage(`${target.name} has been destroyed.`);
        if (this.isAlien) {
          await appendMessage(`You were destroyed! Game over`)
        } else {
          this.removeAlien()
        }
        return true;
      } else {
        // Target survived
        await appendMessage(`The hull of ${target.name} decreased to ${target.hull}.`);
        if (target.isAlien) {
          target.attack(this)
        } else {
          disableButtons(false)
        }
        return false;
      }
    } else {
    // A miss
      await appendMessage("It was a miss!");
      target.attack(this)
      return false;
    }
  }

  // You need async functions to use "await"
  async removeAlien() {
    // ARRAY.shift() removes the first item in an array
    alienShips.shift()
    if (alienShips.length < 1) {
      await appendMessage(`You defeated all the aliens! You win!`)
    } else {
      disableButtons(false)
      // this.attack(alienShips[0])
    }
  }
}
class AlienShip extends Spaceship {
  constructor(hull, firepower, accuracy, name, isAlien){
    super(hull, firepower, accuracy, name, isAlien);
  }
}
  
const playerShip = new Spaceship(20, 5, 0.7, "USS Something", false);
  
const game = () => {
  playerShip.attack(alienShips[0])
  /*   
  while (playerShip.hull > 0 && alienShip.hull > 0){
      playerShip.attack(alienShip);
      if (alienShip.hull > 0){
        alienShip.attack(playerShip);
      }
    }
    if (playerShip.hull <= 0){
      console.log("you win");
    }
    else {
      console.log("you lose");
    } 
    */
}

const alienShips = [];
const numAlienShips = 6;

for (let i = 0; i < numAlienShips; i++) {
  alienShips.push(new AlienShip(4, 4, 0.7, `Alien ship #${i+1}`, true))
}

// game()

// function randRange(lo, hi) {
//   return Math.round(Math.random()*(hi-lo)+lo)
// }

attackBtn.addEventListener('click', game)
retreatBtn.addEventListener('click', ()=>{
  disableButtons(true)
  appendMessage(`You retreated, you lose`)
})

/*
  git add .
  git commit -m "your message"
  git push origin branch-name
*/