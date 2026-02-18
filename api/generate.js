export default async function handler(req, res) {
  const body = req.body;

  const prompt = `
Create a detailed DAILY LESSON LOG.

Subject: ${body.subject}
Grade Level: ${body.grade}
Date: ${body.date}
Time: ${body.time}

Content Standards:
${body.content}

Performance Standards:
${body.performance}

Learning Objectives:
${body.objectives}

References:
${body.references}

Include:
- Introduction
- Motivation
- Lesson Proper
- Guided Practice
- Independent Practice
- Assessment
- Assignment
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  res.status(200).json({ lesson: data.choices[0].message.content });
}
