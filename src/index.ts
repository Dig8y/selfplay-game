import Host from "./host";

const startGame = async () => {
  console.log("Game started");

  const host = new Host(
    "sk-proj-oZjuKIMulbnIPlsg0ZMiT3BlbkFJEuBCoNqUwWKohyP5GuWe"
  );

  console.log("🚀 ~ startGame ~ host:", host);
  const topic = await host.defineTopic();

  
  console.log("🚀 ~ startGame ~ topic:", topic);

  console.log("Game ended");
};

startGame();
