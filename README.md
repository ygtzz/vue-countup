## vue-countup

a vue countup component

### Install

```bash
npm install vue-countup2 -S

yarn install vue-countup2
```

### Quickstart
```javascript
require('vue-countup/dist/vue-countup.css');

// in ES6 modules
import { countup } from 'vue-countup';

// in CommonJS
const { countup } = require('vue-countup');

// in Global variable
const { countup } = VueCountup;

Vue.component('c-countup',countup);
```
```html
<c-countup :value="startUp" :to="to"></c-countup>
```

### Params

`props`
-  `value`: whether to show count up,when is true and to props changes, the num will count up, type is Boolean
-  `to` : the num top limit, type is Number
-  `from`: the num bottom limit, type is Number,default is 0
-  `speed`: how long the count up's interval, type is Number,unit is millisecond
-  `duration` : how long the count up complete,type is Number,unit is millisecond
-  `delay`: the count up's delay time before start,type is Number,unit is millisecond
-  `beforeSize`: num size before dot, num is not enough, will fill 0
-  `decimals` : num size after dot,type is Number,defalut is 0
-  `bShowZero`: whether to show num zero,type is Boolean,defalut is true
-  `lastSymbol`: the symbol after num,type is String

### Preview

![countup image](./doc/countup.gif)