exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email } = JSON.parse(event.body || "{}");

  if (!email || !email.includes("@")) {
    return {
      statusCode: 400,
      body: JSON.stringify({ allow: false })
    };
  }

  const domain = email.split("@")[1].toLowerCase();

  // 使い捨てメールドメイン
  const blockedDomains = [
    "tempmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "yopmail.com",
    "trashmail.com",
    "getnada.com",
    "sharklasers.com"
  ];

  const suspicious = blockedDomains.includes(domain);

  return {
    statusCode: 200,
    body: JSON.stringify({
      allow: !suspicious,
      reason: suspicious ? "disposable_domain" : null
    })
  };
};
