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
  
    removeArticle(Article) {
     let id = +Article.getAttribute('id');
     for (let i = 0; i < this.Articles.length; i++) {
       if (this.Articles[i].id === id) {
         this.Articles.splice(i, 1);
       }
     }

     this.render();с
    }
    
    render() {
      this.container.innerHTML = '';
      this.container.addEventListener('click', (e) => {
        if (e.target.className !== 'removeArticle') return
        this.removeArticle(e.target.parentNode)
      })
      
      for (let i = 0; i < this.Articles.length; i++) {
        this.Articles[i].id = i;

        let article = document.createElement('article');
        article.setAttribute('id', i);
        let title = document.createElement('h1');
        let autor = document.createElement('h2');
        let text = document.createElement('p');
        let remove = document.createElement('span');
     
        remove.innerHTML = 'X';
        remove.className = 'removeArticle';
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