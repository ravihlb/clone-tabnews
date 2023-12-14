function status(request, response) {
  response.status(200).json({ chave: "Fala galera! Como vão vocês?" });
}

export default status;
