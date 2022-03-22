export const SIZE = 9.5;
export const ballRadius = .75;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rand = () => (SIZE - ballRadius) * 2 * (Math.random() - 0.5);

function getRandomCoordinates(balls, toTop = true) {
  let tryTimes = 10;
  let countNewCoordinates = 0;
  let X = rand();
  let Y = SIZE - ballRadius;
  if (toTop === false) {
    Y = rand();
  }
  let Z = rand();
  let isCollision = checkCollision(balls, X, Y, Z);
  while (isCollision && countNewCoordinates < tryTimes) {
    X = rand();
    Y = SIZE - ballRadius;
    if (toTop === false) {
      Y = rand();
    }
    Z = rand();
    isCollision = checkCollision(balls, X, Y, Z);
    countNewCoordinates = countNewCoordinates + 1;
  }
  if (!isCollision) {
    return [X, Y, Z];
  }

  return null;
}


export function createBall(balls) {
  let coords = getRandomCoordinates(balls);

  // Coordinates that do not collide
  if (coords !== null) {
    const ball = {
      coords: coords,
      countNotMoved: 0,
      numberOfMoves: 0,
    };

    return ball;
  }

  return null;
}

export function update(balls) {
  for (let i = 0; i < balls.length; i += 1) {
    if (balls[i].countNotMoved < 50 && balls[i].numberOfMoves < 300) {
      let speed = 0.02;
      let s = SIZE - ballRadius;
      if (balls[i]) {
        let X = balls[i].coords[0] - randomIntFromInterval(-speed, speed);
        let Y = balls[i].coords[1] - 0.5;
        let Z = balls[i].coords[2] - randomIntFromInterval(-speed, speed);

        if (X > s) {
          X = s;
        }
        if (X < -s) {
          X = -s;
        }
        if (Y > s) {
          Y = s;
        }
        if (Y < -s) {
          Y = -s;
        }
        if (Z > s) {
          Z = s;
        }
        if (Z < -s) {
          Z = -s;
        }

        if (checkCollision(balls, X, Y, Z, i)) {
          if (checkCollision(balls, balls[i].coords[0], balls[i].coords[1], balls[i].coords[2], i)) {
            let newCoords = getRandomCoordinates(balls, true);
            if (newCoords !== null) {
              balls[i].coords = newCoords;
            }
          }
          else {
            balls[i].countNotMoved = balls[i].countNotMoved + 1;
          }
        }
        else {
          balls[i].coords[0] = X;
          balls[i].coords[1] = Y;
          balls[i].coords[2] = Z;
        }
        balls[i].numberOfMoves = balls[i].numberOfMoves + 1;
      }
    }
  }
  return balls;
}


function checkCollision(balls, X, Y, Z, ignoreI = null) {
  for (let i = 0; i < balls.length; i += 1) {
    if (ignoreI === null || i !== ignoreI) {
      let diffX = Math.abs(X - balls[i].coords[0]);
      let diffY = Math.abs(Y - balls[i].coords[1]);
      let diffZ = Math.abs(Z - balls[i].coords[2]);
      if (diffX < ballRadius && diffY < ballRadius && diffZ < ballRadius) {
        return true;
      }
    }
  }
  return false;
}
