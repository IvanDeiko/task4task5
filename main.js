let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://my-json-server.typicode.com/mate-academy/literary-blog/articles');
xhr.send()

xhr.onload = function() {
  const responseArticle = JSON.parse(xhr.responseText);

  class ArticleList {
    constructor(container, articles) {
      this.container = container;
      this.Articles = articles ;
    }
    
    addArticle(atricle) {
      this.Articles.push(atricle);
      this.render();
    }
  
    removeArticle(article) {
    let index = this.Articles.indexOf(article);
    this.Articles.splice(index, 1);
    this.render();
    }
    
    render() {
      this.container.innerHTML = '';
      for (let i = 0; i < this.Articles.length; i++) {

        let article = document.createElement('article');
        article.setAttribute('id', i);
        let title = document.createElement('h1');
        let autor = document.createElement('h2');
        let text = document.createElement('p');
        let remove = document.createElement('span');
     
        remove.innerHTML = 'X';
        remove.className = 'removeArticle';

        remove.addEventListener('click', (e) => {
          let article = this.Articles[i];
          this.removeArticle(article)

        })

        title.innerHTML = this.Articles[i].title;
        autor.innerHTML = this.Articles[i].author;
        text.innerHTML = this.Articles[i].text;
        article.append(title, autor, text, remove);

        this.container.append(article);
        document.body.append(this.container)
      }
    }
  }

  let articlesContainer = new ArticleList(document.createElement('div'),  responseArticle);
  articlesContainer.render()
}