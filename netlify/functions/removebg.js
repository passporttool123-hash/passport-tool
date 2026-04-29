exports.handler = async function(event) {
  const apiKey = process.env.REMOVE_BG_API_KEY;

  try {
    const data = JSON.parse(event.body);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_file_b64: data.image,
        size: "auto"
      })
    });

    if (!response.ok) {
      return {
        statusCode: 500,
        body: "remove.bg error"
      };
    }

    const buffer = await response.arrayBuffer();

    return {
      statusCode: 200,
      headers: { "Content-Type": "image/png" },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Server error"
    };
  }
};