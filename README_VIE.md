## Hướng dẫn
Trong package hỗ trợ 3 items mặc định mà các bạn có thể dùng ngay như là:
- `Dialog`: phần nội dung (hộp thoại) nằm ở giữa màn hình.
- `Side`: phần nội dung chiếm chiều cao bằng chiều cao màn hình, có thể nằm ở bên trái hoặc phải.
- `Snackbar`: phần nội dung (thanh ngang), có thể nằm 1 trong 6 vị trí như là góc trên phải, trên cùng, góc trên trái, góc dưới trái, dưới cùng và góc dưới phải.

Các bạn có thể import các function như là `dialog`, `snackbar` hoặc `side` từ "./node_modules/tunangn-html-modal/dist/index.js" (cài đặt thông qua npm) hoặc từ "" (thông qua CDN Link). Ở đây thì mình lấy ví dụ
qua npm.

Các object này đều nhận 2 thuộc tính như nhau là:
- `title`: đổi thông tin ở phần __header__. Các bạn có thể dùng chuỗi HTML.
- `content`: đổi thông tin ở phần __body__. Các bạn có thể dùng chuỗi HTML.

Và tuỳ thuộc vào lựa chọn __huỷ__ hay __đồng ý__ thì Modal Item sẽ trả về một kết quả được resolve từ Promise, dữ liệu này bao gồm những thuộc tính sau:
```ts
{
  isAgree: boolean,
  data?: any,
  message?: string
}
```

## Mục lục hướng dẫn
__*Lưu ý*__: Mình sẽ hướng dẫn chung ở Dialog. Các item còn lại thì mình sẽ chỉ hướng dẫn trọng tâm ở các thuộc tính riêng.

Xem hướng dẫn chi tiết cho Dialog [tại đây](#dialog).

Xem hướng dẫn chi tiết cho Side [tại đây](#side).

Xem hướng dẫn chi tiết cho Snackbar [tại đây](#snackbar).

Xem hướng dẫn chi tiết tự xây dựng dialog, side và snackbar [tại đây](#building)

## Dialog
<a name="dialog"></a>
__*Lưu ý*__: Các hướng dẫn dưới đây đều là từ dialog mặc định.

Một số thuộc tính riêng của `dialog`:
- `cancelBtnLabel`: đổi label cho nút huỷ. Ngoài ra nếu bạn truyền vào cho nó là `null`, thì nút `huỷ` không hiển thị. Tuy nhiên nếu như bạn truyền `undefined` thì nó vẫn hiển thị và có label mặc định.
- `agreeBtnLabel`: đổi label cho nút đồng ý. Ngoài ra nếu bạn truyền vào cho nó là `null`, thì nút `đồng ý` không hiển thị. Tuy nhiên nếu như bạn truyền `undefined` thì nó vẫn hiển thị và có label mặc định.

### Hiển thị dialog MẶC ĐỊNH với một vài thuộc tính.
Bây giờ mình sẽ hiển thị một dialog với `title`, `content`, `cancelBtnLabel` và `agreeBtnLabel` như sau:
```js
import { dialog } from "./node_modules/tunangn-html-modal/dist/index.js";

// Hiển thị dialog với title và content
dialog({
  title: "Đây là hộp thoại",
  content: "Đây là nội dung của hộp thoại!!",
  cancelBtnLabel: "Huỷ",
  agreeBtnLabel: "Đồng ý"
});
```

__Kết quả__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/76e8b9b7-9378-4ea4-9daf-9eedbdf217b9)

### Thêm icon cho phần title với Google Icon bằng chuỗi HTML.
Như mình dã nói ở bên trên thì các bạn có thể thay đổi phần title bằng chuỗi HTML. Mình import icon (variable icon) từ [Google Fonts](https://fonts.google.com/icons) ở trong
file `index.html`.
```js
// Hiển thị dialog với icon ở title
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

__Kết quả__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/4d2d2c1f-2c6f-48d0-b6d0-6de6940ba92d)

### Nhận lại kết quả từ Dialog, dùng kết quả này để mở các Dialog khác.
Như mình đã nói ở trên thì `dialog` sẽ trả về kết quả thông qua Promise. Bây giờ dựa vào kết quả này thì mình sẽ hiển thị ra 2 dialog khác nhau.
Và để cho đơn giản thì mình sẽ dùng `dialog` ở ví dụ đầu tiên và sửa lại chút xíu
```js
dialog({
  title: "Đây là hộp thoại",
  content: "Bạn có đồng ý với điều khoản này không?",
  cancelBtnLabel: "Không đồng ý",
  agreeBtnLabel: "Đồng ý"
})
.then(result => {
  // Nếu như nhấn nút `Đồng ý` thì result.isAgree = true
  if(result.isAgree) {
    dialog({
      title: "Bạn đã đồng ý",
      content: "Cảm ơn bạn đã đồng ý với điều khoản của chúng tôi :D",
      // Truyền null để bỏ nút huỷ
      cancelBtnLabel: null,
      agreeBtnLabel: "Tiếp tục"
    })
  } else {
    dialog({
      title: "Bạn không đồng ý",
      content: "Điểu khoản có gì làm bạn bận tâm sao?",
      cancelBtnLabel: "Trở lại",
      // Truyền null để bỏ nút đồng ý.
      agreeBtnLabel: null
    })
  }
});
```

__Kết quả__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/1e4f3d09-7f60-4955-818b-e9b1cf23939a)

Giờ thì mình ấn "Không đồng ý"

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/d15901de-556e-46f5-97cf-c3b6051b23ae)

Tiếp tục, ấn "Đồng ý" 

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/93f7a4ad-4409-409f-b369-3107cbdcb636)

Ok như vậy là đã xong phần cơ bản của dialog. Giờ thì mình sẽ hướng dẫn tiếp 2 cái còn lại.


## Side
<a name="side"></a>
__*Lưu ý*__: Các hướng dẫn dưới đây đều là từ side mặc định.
Side thì không có thuộc tính gì mặc định, và nó sẽ xuất hiện ở bên trái màn hình của các bạn.

### Hiển thị Side và tạo một unordered list gồm 5 items.
Giờ thì hiển thị side với một số thông tin và code như sau:
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

// Hiển thị dialog với content gồm 5 unordered-list items.
side({
  title: "Đây là title của thanh dọc bên trái",
  content: list
});
```
__Kết quả__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/a0f02403-47c5-4211-bc2e-cc5361252278)

## Snackbar
<a name="snackbar"></a>
__*Lưu ý*__: Các hướng dẫn dưới đây đều là từ snackbar mặc định.
Snackbar là một thanh thông báo nhỏ trên cùng của màn hình. Sau 7s thì nó sẽ tự động đóng.

Một số thuộc tính riêng của `snackbar`:
- `canAutoClose`: cho biết là snackbar có tự động đóng hay không?
- `color`: thay đổi màu background của header. Là màu làm snackbar nổi bật.
- `duration`: thay đổi thời gian tự động đóng của snackbar, tuy nhiên nó sẽ không hoạt động nếu như `canAutoClose = true`. Đơn vị là `mili` giây.

### Hiển thị thông báo cùng với icon và lời nhắn
Cho title hiển thị một icon, và thông báo lời nhắn "Bạn đã đăng nhập thành công", đổi màu thành xanh lá. Ngoài ra thì cho nó hiển thị 3s rồi tắt.
```js
import { snackbar } from "./node_modules/tunangn-html-modal/dist/index.js";

// Hiển thị dialog
// `fill`` trong class của span là mình đã style cho nó trước.
snackbar({
  title: `<span class="material-symbols-outlined fill">check_circle</span>`,
  content: "Bạn đã đăng nhập thành công!",
  duration: 3000
});
```

__Kết quả__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/e39ece3b-cdc0-4505-bcf8-9d7c9ededf42)

2 thuộc tính còn lại thì mình không test ở đây, vì các bạn sẽ không thấy được.

## Xây dựng dialog, side và snackbar
<a name="building"></a>
Với những cách dùng ở trên thì các bạn có thể thấy rất dễ để xử dụng, tuy nhien thì cái này chỉ dùng trong trường hợp bạn không muốn hiển thị ra dialog, side quá phức tạp (snackbar thì đơn giản thôi, còn side thì mình khuyên là nên tự custom). Các thuộc tính trên truyền vào là nhũng dữ liệu mặc định mà bạn muốn thay đổi UI của item mặc định hoặc gán dữ liệu vào item mặc định. Nhưng giờ bạn muốn lấy dữ liệu một cách phức tạp hơn thì sao? Cho nên là mình hỗ trợ thên cho các bạn function `createModal` dùng để tự tạo ra một object quản lý các modal items.

Nhận vào một object gồm 2 thuộc tính:
- `className`: thay để class mặc định của modal container là `tunangn-modal`. Và bạn phải viết css cho phù hợp nếu như bạn thay thế tên class mặc định. Ngoài ra nếu như các modal được tạo nên cùng một className, ví dụ như là
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
Thì 2 object modal này sẽ có cùng một modal container.

- `items`: là một mảng nhận vào các thuộc tính dùng để build modal item. Các object này bao gồm các thuộc tính như sau:
  - `name`: [__Bắt buộc__] là tên của item.
  - `type`: [__Bắt buộc__] là loại item. Có 3 loại như các bạn đã biết là `dialog`, `side` và `snackbar`.
  - `components` là một object chứa các UI Element của item, bao gồm `container`, `header`, `body` và `footer`.
    - `container`: các bạn có thể dùng chuỗi html để custom nhanh, nhưng mình không khuyến khích các bạn custom cái này.
    - `header`: custom lại header.
    - `body`: custom lại phần body.
    - `footer`: custom lại phần footer.
    Các thuộc tính này sẽ nhận vào một chuỗi (HTML), function hoặc là một object. Cụ thể như thế nào thì mình xuống phần hướng dẫn.

### Xây dựng một modal có chứa dialog và right side
Các UI Element sau khi được tạo từ `createModal` là những UI Element mặc định, tuy nhiên các bạn có thể CUSTOM được nó. `createModal` sẽ trả về một function, function này giúp các bạn có thể mở được các modal vừa mới assign ở bên trong.

Ở ví dụ bên dưới mình không thay thế class name và container của item. Và mình sẽ build side và dialog, snackbar thì không cần lắm (nếu như các bạn muốn thì làm theo mình là được). Ngoài ra thì dialog một vài chỗ mình dùng inline style và không style, cho nên sẽ hơi xấu và bất tiện, còn nếu có class và style thì sẽ đẹp hơn.
```js
// Import createModal
import { createModal } from "./node_modules/tunangn-html-modal/dist/index.js";

let dialogName= "myDialog";
let sideName = "myRightSide";

const open = createModal({
  items: [
    {
      /*
        Mình sẽ tạo dialog, và custom lại phần content của nó.
      */
      name: dialogName,
      type: "dialog",
      components: {
        // Với function thì nó sẽ nhận vào 2 tham số là close (function), item (object).
        // Ở đây mình sẽ tạo ra một form nhỏ, và đồng thời sẽ lấy dữ liệu từ form này.
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

        // Mình muốn ẩn footer đi thì mình truyên vào null.
        footer: null
      }
    }
  ]
});

// Mở dialog và truyền dữ liệu cho label và text.
// Các data mặc định sẽ vẫn hoạt động, nếu như các bạn không ghi đè lên component.
// Ví dụ như ở trên mình ghi đè lên body, cho nên mình không thể truyền content vào được nữa
// có truyền được thì cũng không có gì xảy ra
open(dialogName, {
  title: "Form đăng nhập",
  label: "Đăng nhập",
  text: "Đây là nội dung sẽ được truyền vào trong hộp thoại."
}).then(console.log);
```

__Kết quả__
Giờ thì mình sẽ nhập thêm username và password, mình sẽ được kết quả như sau:

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/b668aae5-5d27-474f-8fcb-d38e68c6d5e5)

Ấn nút đăng nhập thì sẽ nhận được một kết quả.

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/b541669f-824a-4037-b324-77f20c7a083c)

Rẩt dễ đúng không? Giờ thì mình sẽ làm tiếp Side, nhưng nó sẽ ở vị trí bên phải. Side này giống với trên ví dụ trước, đồng thời mình sẽ sửa lại snackbar ở ví dụ snackbar
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
        // Ở body mình fix cứng dữ liệu, nếu như các bạn muốn nhận các thông tin từ bên ngoài thì có thể dùng function để build.
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

// Giờ thì mở right side này lên.
open(sideName, { title: "Hồ sơ cá nhân" }).then(() => {
  snackbar({
    title: `<span class="material-symbols-outlined fill">cancel</span>`,
    content: "Bạn đã đăng xuất!",
    color: "#F54242",
    duration: 3000
  });
});
```

__Kết quả__

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/a48390cd-9a5d-4997-9896-39c0ff18f70a)

Giờ mình ấn thoát

![image](https://github.com/NguyenAnhTuan1912/tunangn-html-modal/assets/86825061/a28f9b87-8494-4924-b431-5442c900fbd2)

Ok như vậy là đã xong. Nếu như có vấn đề gì trong quá trình sử dụng các bạn có thể viết issue trực tiếp trong repo này nhé. Mình sẽ cập nhật thêm để cho các bạn có thể dễ sử dụng hơn.
