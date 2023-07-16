## How to use?
Package support 3 default modal items that you can instantly use like:
- `Dialog`: content box (call box) is placed center of the screen.
- `Side`: content box has the same height of screen, can be placed in left or right.
- `Snackbar`: small content box (vertical bar), can be placed one of six position including top right, top, top left, bottom left, bottom and bottom right angel.

You can import these functions `dialog`, `snackbar` or `side` from "./node_modules/tunangn-html-modal/dist/index.js" (installed from npm) or from "" (from CDN Link). In this document, I will import from installed dependency.

They have the same properties:
- `title`: modify information of title of __header__. You can use HTML string.
- `content`: modify information of content of __body__. You can use HTML string.

And depend on __cancel__ or __agree__ choice, Modal Item will return the result that is resolved from Promise, it include these properties:
```ts
{
  isAgree: boolean,
  data?: any,
  message?: string
}
```

## Table of Contents
__*Note*__: In this document, I will give essential examples with dialog. Other items will be gave example in their particular properties.
Read Details Exmaple for Dialog [here](#dialog).

Read Details Exmaple for Side [here](#side).

Read Details Exmaple for Snackbar [here](#snackbar).

Read Details Exmaple for create dialog, side and snackbar [here](#building)

## Dialog
<a name="dialog"></a>
__*Lưu ý*__: These examples is for default dialog.

Particular properties of `dialog`:
- `cancelBtnLabel`: modify label of cancel button. Otherwise if you assign `null`, `cancel` button will not be showed. But if you assign `undefined`, button will be showed and has default label.
- `agreeBtnLabel`: modify label of agree button. Otherwise if you assign `null`, `agree` button will not showed. But if you assign `undefined`, button will be showed and has default label.

### Show DEFAULT dialog with some properties
I will show dialog with `title`, `content`, `cancelBtnLabel` and `agreeBtnLabel`:
```js
import { dialog } from "./node_modules/tunangn-html-modal/dist/index.js";

// Show dialog with title, content and modify label of cancel and agree button.
dialog({
  title: "Đây là hộp thoại",
  content: "Đây là nội dung của hộp thoại!!",
  cancelBtnLabel: "Huỷ",
  agreeBtnLabel: "Đồng ý"
});
```

__Result__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/76e8b9b7-9378-4ea4-9daf-9eedbdf217b9)

### Add icon in title with Google Icon and HTML string.
You can modify the title with HTML string. I will import icon (variable icon) from [Google Fonts](https://fonts.google.com/icons) from file `index.html`.
```js
// Show dialog with icon in title.
let htmlTitle = `
  <div style="display: flex; align-items: center">
    <span class="material-symbols-outlined" style="margin-right: 0.75rem">favorite</span> Đây là title của hộp thoại
  </div>
`
dialog({
  title: htmlTitle,
  content: "Đây là nội dung của hộp thoại!!",
  cancelBtnLabel: "Huỷ",
  agreeBtnLabel: "Đồng ý"
});
```

__Result__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/4d2d2c1f-2c6f-48d0-b6d0-6de6940ba92d)

### Receive result from a dialog, then use this result to show other dialog.
`dialog` will return a result from Promise. Depend on the result, I will show 2 various dialog. And for simplicity, I will make `dialog` like in the first example:
```js
dialog({
  title: "Đây là hộp thoại",
  content: "Bạn có đồng ý với điều khoản này không?",
  cancelBtnLabel: "Không đồng ý",
  agreeBtnLabel: "Đồng ý"
})
.then(result => {
  // If `agree` button is clicked, this dialog will be showed.
  if(result.isAgree) {
    dialog({
      title: "Bạn đã đồng ý",
      content: "Cảm ơn bạn đã đồng ý với điều khoản của chúng tôi :D",
      // Assign null to hide cancel button
      cancelBtnLabel: null,
      agreeBtnLabel: "Tiếp tục"
    })
  } else {
    dialog({
      title: "Bạn không đồng ý",
      content: "Điểu khoản có gì làm bạn bận tâm sao?",
      cancelBtnLabel: "Trở lại",
      // Assign null to hide agree button.
      agreeBtnLabel: null
    })
  }
});
```

__Result__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/1e4f3d09-7f60-4955-818b-e9b1cf23939a)

When I click "Không đồng ý" button

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/d15901de-556e-46f5-97cf-c3b6051b23ae)

Continuously, click "Đồng ý" button 

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/93f7a4ad-4409-409f-b369-3107cbdcb636)

Ok, that's all of the essential example of dialog (you can apply with 2 remains).


## Side
<a name="side"></a>
__*Lưu ý*__: These examples is for default side.
There aren't particular properties for side.

### Show a side (left) with an unordered list contains 5 items.
Show side with some information like this:
```js
import { side } from "./node_modules/tunangn-html-modal/dist/index.js";

let list = `
<ul>
  <li>Đây là item đầu tiên</li>
  <li>Đây là item thứ hai</li>
  <li>Đây là item thứ ba</li>
  <li>Đây là item thứ tư</li>
  <li>Đây là item thứ năm và cũng là cuối cùng</li>
</ul>
`;

// Show side with 5 unordered-list items.
side({
  title: "Đây là title của thanh dọc bên trái",
  content: list
});
```
__Result__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/a0f02403-47c5-4211-bc2e-cc5361252278)

## Snackbar
<a name="snackbar"></a>
__*Lưu ý*__: These examples is for default snackbar.
Snackbar is a small vertical information bar is placed on top of the screen. This will be automatically close after 7 seconds.

Some particular properties `snackbar`:
- `canAutoClose`: Can snackbar automatically close?
- `color`: modify background color of header.
- `duration`: modify the close time of snackbar, but it will not work if `canAutoClose = true`. In `mili` second unit.

### Show a message with snackbar has icon
Add a icon in header of snackbar, and show message "Bạn đã đăng nhập thành công", change background color of header to green. Otherwise, it will be show in 3 seconds.
```js
import { snackbar } from "./node_modules/tunangn-html-modal/dist/index.js";

// First, show dialog
// `fill` in class attribute of span that I defined css for it before.
snackbar({
  title: `<span class="material-symbols-outlined fill">check_circle</span>`,
  content: "Bạn đã đăng nhập thành công!",
  duration: 3000
});
```

__Result__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/e39ece3b-cdc0-4505-bcf8-9d7c9ededf42)

`canAutoClose` and `duration` can not be show directly.

## Customize dialog, side and snackbar
<a name="building"></a>
With above examples, you can see this package is "easy to use", if you use dialog, snackbar basically (you should customize side). Properties I use in previous example that are default properties of dialog, side and snackbar use to modify default UI Element or assign data. But if you want to show complex dialog, side or snackbar, how do you do? So I create a function named `createModal` to create an object that can manage modal items.

Receive an object has 2 properties:
- `className`: change default class name of modal container `tunangn-modal` to another one. And you must write you own css code for this. And if you create 2 object with the same class name,
```js
const modal1 = createModal({
  className: "my-modal",
  ...
});

const modal2 = createModal({
  className: "my-modal",
  ...
});
```
They will reference the same modal container element.

- `items`: contains an array of objects that are used to configure modal item. Including these properties:
  - `name`: [__Bắt buộc__] name of item.
  - `type`: [__Bắt buộc__] type of item. Have 3 types as you knew `dialog`, `side` and `snackbar`.
  - `components` is a object contains UI Element of item, includes `container`, `header`, `body` and `footer` (each of them can be a funtion, HTML string or object).
    - `container`: use HTML string for quickly assign (recommended). But I don't recommend to modify it.
    - `header`: custom header.
    - `body`: custom body.
    - `footer`: custom footer.

### Customize a modal contains dialog and right side.
UI Elements (modal item) is created from `createModal` is default, but you can customize them. `createModal` will return a function, this function will help you open the assigned modal item.

In the example, I will not change the default class name of modal container. Otherwise, I will use inline style or not for Element, so It can be urgly... (you must define css to make it better).
```js
// Import createModal
import { createModal } from "./node_modules/tunangn-html-modal/dist/index.js";

let dialogName= "myDialog";
let sideName = "myRightSide";

const open = createModal({
  items: [
    {
      /*
        I will assign dialog and modify its body.
      */
      name: dialogName,
      type: "dialog",
      components: {
        // If you use function, I will receive 2 parameters close is a function, and item is modal item.
        // And the body will have a small form to get username and password.
        body: function(close, item) {
          const div = document.createElement("div");
          const form = document.createElement("form");
          const content = document.createElement("div");

          const data = item.getData();

          const onSubmit = e => {
            e.preventDefault();
            const username = e.target["username"].value;
            const password = e.target["password"].value;

            close({ data: { username, password }, isAgree: true });
          };

          const formContentHTML = `
            <div><label>Tài khoản: <input name="username" type="text" /></label></div>
            <div><label>Mật khẩu: <input name="password" type="password" /></label></div>
            <input type="submit" value="Đăng nhập" />
          `;

          const contentHTML = `
            <div>
              <h3>${data.label}</h3>
              <p style="color: red">${data.text}</p>
            </div>
          `;

          div.style.margin = "0.75rem";

          form.innerHTML = formContentHTML;
          form.onsubmit = onSubmit;

          content.innerHTML = contentHTML;

          div.append(content, form);

          return div;
        },

        // I want to hide footer, so I assign `null`
        footer: null
      }
    }
  ]
});

// Open dialog and fill username, password input.
// Default properties like title, content will be work finely if you dont override its UI components is concerning with.
// I override the body, so the `content` properties will not work.
open(dialogName, {
  title: "Form đăng nhập",
  label: "Đăng nhập",
  text: "Đây là nội dung sẽ được truyền vào trong hộp thoại."
}).then(console.log);
```

__Result__
Fill username and password

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/b668aae5-5d27-474f-8fcb-d38e68c6d5e5)

Click "Đăng nhập" button and receive a result:

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/b541669f-824a-4037-b324-77f20c7a083c)

Easy, right? I will do the same with Side (actually a few differences), but It will be placed on right. Side is the same with the previous one, and I will use the previous snackbar.
```js
const open = createModal({
  items: [
    // Dialog
    {...},
    {
      name: sideName,
      type: "side",
      placeOn: "right",
      components: {
        // Assign body with html string.
        body: `<ul style="height: 100%">
          <li>Đây là item đầu tiên</li>
          <li>Đây là item thứ hai</li>
          <li>Đây là item thứ ba</li>
          <li>Đây là item thứ tư</li>
          <li>Đây là item thứ năm và cũng là cuối cùng</li>
        </ul>`,

        footer: function(close) {
          const button = document.createElement("button");
          button.textContent = "Thoát";
          button.style.padding = "1rem";
          button.onclick = close
          return button;
        }
      }
    }
  ]
});

// Open right side
open(sideName, { title: "Hồ sơ cá nhân" }).then(() => {
  snackbar({
    title: `<span class="material-symbols-outlined fill">cancel</span>`,
    content: "Bạn đã đăng xuất!",
    color: "#F54242",
    duration: 3000
  });
});
```

__Result__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/a48390cd-9a5d-4997-9896-39c0ff18f70a)

Then I click "X"

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/a28f9b87-8494-4924-b431-5442c900fbd2)

OK done. If you have problem when use this package, you can describe it in issue of this repo. I will update for easier using.