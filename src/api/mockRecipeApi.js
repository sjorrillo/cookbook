import delay from './delay';
import _ from 'lodash';

const recipes = [{"id":1,"publishDate":"2016-06-29T05:48:33Z","name":"Quamba","slug":"quamba","category":"Salads","chef":"Gastón Acurio","preparation":"Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.","raters":1,"rating":4,"ingredients":[{"id":1,"name":"Wrapsafe","amount":"#2fb"},{"id":2,"name":"Solarbreeze","amount":"#1e0"}],"comments":[{"id":1,"content":"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."},{"id":2,"content":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."},{"id":3,"content":"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."},{"id":4,"content":"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."},{"id":5,"content":"Sed ante. Vivamus tortor. Duis mattis egestas metus."}]},
{"id":2,"publishDate":"2016-06-28T05:37:24Z","name":"Bubbletube","slug":"bubbletube","category":"Salads","chef":"Gastón Acurio","preparation":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.","raters":1,"rating":5,"ingredients":[{"id":1,"name":"Voyatouch","amount":"#cde"}],"comments":[{"id":1,"content":"Sed ante. Vivamus tortor. Duis mattis egestas metus."},{"id":2,"content":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus."}]},
{"id":3,"publishDate":"2016-06-03T17:50:52Z","name":"Wordpedia","slug":"wordpedia","category":"Pastas","chef":"Javier Orrillo","preparation":"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.","raters":1,"rating":5,"ingredients":[{"id":1,"name":"Alpha","amount":"#fa0"},{"id":2,"name":"Ronstring","amount":"#683"}],"comments":[{"id":1,"content":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat."},{"id":2,"content":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."},{"id":3,"content":"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},{"id":4,"content":"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."},{"id":5,"content":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius."}]},
{"id":4,"publishDate":"2016-07-02T02:36:51Z","name":"Eayo","slug":"eayo","category":"Pastas","chef":"Javier Wong","preparation":"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.","raters":1,"rating":4,"ingredients":[{"id":1,"name":"Fixflex","amount":"#074"}],"comments":[{"id":1,"content":"Fusce consequat. Nulla nisl. Nunc nisl."},{"id":2,"content":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."},{"id":3,"content":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."},{"id":4,"content":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."},{"id":5,"content":"Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."}]},
{"id":5,"publishDate":"2016-03-29T21:54:56Z","name":"Trudoo","slug":"trudoo","category":"Desserts","chef":"Javier Orrillo","preparation":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.","raters":1,"rating":2,"ingredients":[{"id":1,"name":"Fix San","amount":"#69a"},{"id":2,"name":"Keylex","amount":"#311"}],"comments":[{"id":1,"content":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."},{"id":2,"content":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."}]},
{"id":6,"publishDate":"2016-04-15T06:28:16Z","name":"Aibox","slug":"aibox","category":"Meat","chef":"Gastón Acurio","preparation":"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","raters":2,"rating":1,"ingredients":[{"id":1,"name":"Biodex","amount":"#c63"},{"id":2,"name":"Prodder","amount":"#d0e"},{"id":3,"name":"Zamit","amount":"#4c1"},{"id":4,"name":"Rank","amount":"#a11"}],"comments":[{"id":1,"content":"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."},{"id":2,"content":"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."}]},
{"id":7,"publishDate":"2016-05-01T07:36:11Z","name":"Dynazzy","slug":"dynazzy","category":"Salads","chef":"Javier Wong","preparation":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.","raters":3,"rating":3,"ingredients":[{"id":1,"name":"Bigtax","amount":"#678"},{"id":2,"name":"Asoka","amount":"#bc9"},{"id":3,"name":"Alpha","amount":"#4aa"}],"comments":[{"id":1,"content":"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."},{"id":2,"content":"Phasellus in felis. Donec semper sapien a libero. Nam dui."}]},
{"id":8,"publishDate":"2016-04-11T02:06:25Z","name":"Gigabox","slug":"gigabox","category":"Salads","chef":"Javier Wong","preparation":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.","raters":3,"rating":1,"ingredients":[{"id":1,"name":"Job","amount":"#2ec"},{"id":2,"name":"Daltfresh","amount":"#dee"},{"id":3,"name":"Mat Lam Tam","amount":"#e2e"},{"id":4,"name":"Job","amount":"#45e"},{"id":5,"name":"Voyatouch","amount":"#f38"}],"comments":[{"id":1,"content":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."}]},
{"id":9,"publishDate":"2016-04-21T09:12:59Z","name":"Leenti","slug":"leenti","category":"Desserts","chef":"Javier Orrillo","preparation":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.","raters":2,"rating":3,"ingredients":[{"id":1,"name":"Asoka","amount":"#ace"},{"id":2,"name":"Duobam","amount":"#644"},{"id":3,"name":"Kanlam","amount":"#fb1"},{"id":4,"name":"Andalax","amount":"#273"},{"id":5,"name":"Voyatouch","amount":"#cc1"}],"comments":[{"id":1,"content":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus."},{"id":2,"content":"Fusce consequat. Nulla nisl. Nunc nisl."},{"id":3,"content":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."},{"id":4,"content":"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."},{"id":5,"content":"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."}]},
{"id":10,"publishDate":"2016-08-22T11:39:35Z","name":"Devbug","slug":"devbug","category":"Desserts","chef":"Javier Orrillo","preparation":"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","raters":1,"rating":4,"ingredients":[{"id":1,"name":"Lotlux","amount":"#ee0"}],"comments":[{"id":1,"content":"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."},{"id":2,"content":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."}]},
{"id":11,"publishDate":"2016-05-30T01:11:57Z","name":"Zoozzy","slug":"zoozzy","category":"Pastas","chef":"Gastón Acurio","preparation":"Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.","raters":2,"rating":2,"ingredients":[{"id":1,"name":"Tin","amount":"#955"},{"id":2,"name":"Rank","amount":"#e39"},{"id":3,"name":"Alphazap","amount":"#e22"}],"comments":[{"id":1,"content":"Sed ante. Vivamus tortor. Duis mattis egestas metus."},{"id":2,"content":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."},{"id":3,"content":"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh."},{"id":4,"content":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}]},
{"id":12,"publishDate":"2016-03-27T00:14:04Z","name":"Quimm","slug":"quimm","category":"Pastas","chef":"Javier Wong","preparation":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.","raters":1,"rating":4,"ingredients":[{"id":1,"name":"Solarbreeze","amount":"#3ab"}],"comments":[{"id":1,"content":"Phasellus in felis. Donec semper sapien a libero. Nam dui."},{"id":2,"content":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."},{"id":3,"content":"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."},{"id":4,"content":"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."}]},
{"id":13,"publishDate":"2016-05-09T19:34:49Z","name":"Feedmix","slug":"feedmix","category":"Salads","chef":"Javier Orrillo","preparation":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.","raters":2,"rating":5,"ingredients":[{"id":1,"name":"Sonair","amount":"#e0a"},{"id":2,"name":"Wrapsafe","amount":"#306"},{"id":3,"name":"Konklux","amount":"#4b6"},{"id":4,"name":"Fix San","amount":"#371"},{"id":5,"name":"Treeflex","amount":"#d45"}],"comments":[{"id":1,"content":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."},{"id":2,"content":"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh."}]},
{"id":14,"publishDate":"2016-01-16T00:46:44Z","name":"Twimm","slug":"twimm","category":"Pastas","chef":"Javier Wong","preparation":"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.","raters":2,"rating":5,"ingredients":[{"id":1,"name":"Zaam-Dox","amount":"#05c"},{"id":2,"name":"Pannier","amount":"#79d"}],"comments":[{"id":1,"content":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."},{"id":2,"content":"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."},{"id":3,"content":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."},{"id":4,"content":"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."}]},
{"id":15,"publishDate":"2016-06-28T05:37:36Z","name":"Wikido","slug":"wikido","category":"Pastas","chef":"Javier Wong","preparation":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.","raters":3,"rating":3,"ingredients":[{"id":1,"name":"Asoka","amount":"#a11"}],"comments":[{"id":1,"content":"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."},{"id":2,"content":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."},{"id":3,"content":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."}]},
{"id":16,"publishDate":"2016-03-12T20:52:07Z","name":"Bubblebox","slug":"bubblebox","category":"Desserts","chef":"Javier Orrillo","preparation":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.","raters":2,"rating":2,"ingredients":[{"id":1,"name":"Subin","amount":"#688"}],"comments":[{"id":1,"content":"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."}]},
{"id":17,"publishDate":"2016-03-06T05:13:01Z","name":"Voonyx","slug":"voonyx","category":"Salads","chef":"Javier Wong","preparation":"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.","raters":1,"rating":1,"ingredients":[{"id":1,"name":"Duobam","amount":"#0de"},{"id":2,"name":"Namfix","amount":"#c6f"},{"id":3,"name":"Sonair","amount":"#b6f"}],"comments":[{"id":1,"content":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."}]},
{"id":18,"publishDate":"2016-02-20T05:14:05Z","name":"Quatz","slug":"quatz","category":"Pastas","chef":"Javier Wong","preparation":"Sed ante. Vivamus tortor. Duis mattis egestas metus.","raters":1,"rating":3,"ingredients":[{"id":1,"name":"Fintone","amount":"#3f3"},{"id":2,"name":"Daltfresh","amount":"#c18"},{"id":3,"name":"Greenlam","amount":"#cd7"}],"comments":[{"id":1,"content":"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."},{"id":2,"content":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."},{"id":3,"content":"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."},{"id":4,"content":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."},{"id":5,"content":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."}]}];

const getNewId = () => {
    if (recipes.length == 0)
        return 1;

    let sortedItems = _.sortBy(recipes, function (x) {
        return x.Id;
    });

    let lastItem = _.last(sortedItems);
    return lastItem.id + 1;
};

const slugify = (text) =>{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

class RecipeApi {


  static getAllRecipes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], recipes));
      }, delay);
    });
  }

  static saveRecipe(recipe) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!recipe.name || recipe.name.length < 3) {
          reject("The name of the recipe must be more than 3 charcaters");
        }

        recipe.slug = slugify(recipe.name);
        var exists = _.some(recipes, (x) => (recipe.id == 0 || x.id != recipe.id) && x.name.toLowerCase() == recipe.name.toLowerCase());
        if(exists) {
          reject("The recipe's name exists in the database");
        }

        if (recipe.id == 0) {
          recipe.id = getNewId();
          recipes.push(recipe);
        } else {
           const index = recipes.findIndex(a => a.id == recipe.id);
           recipes.splice(index, 1, recipe);
        }

        resolve(Object.assign({}, recipe));
      }, delay);
    });
  }

  static deleteRecipe(recipeId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = recipes.findIndex(recipe => {
          recipe.id == recipeId;
        });
        recipes.splice(index, 1);
        resolve();
      }, delay);
    });
  }
}

export default RecipeApi;