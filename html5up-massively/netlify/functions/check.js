exports.handler = async (event) => {
  const { email } = JSON.parse(event.body || "{}");

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ allow: false })
    };
  }

  const suspicious =
    email.includes("tempmail") ||
    email.includes("fake") ||
    email.includes("test");

  return {
    statusCode: 200,
    body: JSON.stringify({
      allow: !suspicious,
      reason: suspicious ? "disposable" : null
    })
  };
};