let tractor;
let food;
let hasFood = false;
let score = 0;

let timeLeft = 60;         // Tempo em segundos
let gameOver = false;
let lastTimeCheck;

function setup() {
  createCanvas(800, 400);
  tractor = createVector(100, height / 2);
  food = createVector(random(50, 200), random(50, height - 50));
  lastTimeCheck = millis();
}

function draw() {
  background(220);

  // Atualiza o tempo restante
  if (!gameOver) {
    if (millis() - lastTimeCheck >= 1000) {
      timeLeft--;
      lastTimeCheck = millis();
    }
    if (timeLeft <= 0) {
      gameOver = true;
    }
  }

  // Campo (lado esquerdo)
  fill(144, 238, 144);
  rect(0, 0, width / 2, height);

  // Cidade (lado direito)
  fill(200);
  rect(width / 2, 0, width / 2, height);

  // Área de entrega
  fill(150, 200, 0); // local da entrega
  rect(width - 100, 0, 100, height);

  // Texto "ENTREGA"
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("ENTREGA", width - 50, height / 2);

  // Alimento
  if (!hasFood && !gameOver) {
    fill(100, 200, 0);
    ellipse(food.x, food.y, 20, 20);
  }

  // Trator
  fill(hasFood ? color(255, 100, 100) : color(255, 0, 0));
  rect(tractor.x, tractor.y, 40, 20);

  if (!gameOver) {
    // Movimentação
    if (keyIsDown(LEFT_ARROW)) tractor.x -= 3;
    if (keyIsDown(RIGHT_ARROW)) tractor.x += 3;
    if (keyIsDown(UP_ARROW)) tractor.y -= 3;
    if (keyIsDown(DOWN_ARROW)) tractor.y += 3;

    // Limites
    tractor.x = constrain(tractor.x, 0, width - 40);
    tractor.y = constrain(tractor.y, 0, height - 20);

    // Coleta
    if (!hasFood && dist(tractor.x + 20, tractor.y + 10, food.x, food.y) < 20) {
      hasFood = true;
    }

    // Entrega
    if (hasFood && tractor.x > width - 100) {
      hasFood = false;
      score++;
      food = createVector(random(50, 200), random(50, height - 50));
    }
  }

  // Exibir pontuação
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Alimentos entregues: " + score, 10, 10);

  // Exibir tempo restante
  textAlign(RIGHT, TOP);
  text("Tempo: " + timeLeft + "s", width - 10, 10);

  // Mensagem de fim de jogo
  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Fim de jogo! Pontuação: " + score, width / 2, height / 2);
    textSize(16);
    text("Pressione ESPAÇO para jogar novamente", width / 2, height / 2 + 40);
  }
}

function keyPressed() {
  if (gameOver && key === ' ') {
    // Reiniciar o jogo
    tractor = createVector(100, height / 2);
    food = createVector(random(50, 200), random(50, height - 50));
    hasFood = false;
    score = 0;
    timeLeft = 60;
    gameOver = false;
    lastTimeCheck = millis();
  }
}
                 