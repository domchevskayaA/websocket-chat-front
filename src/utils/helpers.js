const colors = ['#20a8d8', '#4dbd74', '#684388', '#FFFF00', '#f58231', '#000075', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075'];

const getColorByIndex = index => colors[index];

const scrollElementToBottom = (id) => {
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({block: "end", inline: "nearest"});                
        }
    })
 };

 const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
});

const getCompanion = (chatUsers, currentUserId) => {
    let companion = {};
    chatUsers.map(user => {
        if (user._id !== currentUserId) companion = user;
    });
    return companion;
};

export {
  getColorByIndex,
  scrollElementToBottom,
  toBase64,
  getCompanion,
}
