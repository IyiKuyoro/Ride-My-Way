const slackController = () => {
  const message = 'I like to mislead folks and outsmart people';
  return {
    ijapa: (req, res) => {
      res.status(200).json({
        text: 'Hey! I am Ijapa from the native Yoruba tales',
        attachments: [
          {
            text: message
          }
        ]
      });
    }
  };
};

export default slackController();
