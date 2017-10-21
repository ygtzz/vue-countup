<template>
    <span class="countup" v-text="sCount"></span>
</template>
<script>
import Vue from "vue";

export default {
    name:'c-countup',
    destroyed(){
        clearInterval(this.timer);
    },
    props:{
        value:{
            type:Boolean,
            required:true,
            default:false
        },
        to:{
            type: [String,Number],
            required: true
        },
        from:{
            type: [String,Number],
            default: 0
        },
        speed:{
            type: Number,
            default:100
        },
        duration:{
            type: Number,
            default: 1000
        },
        delay:{
            type:Number,
            default:50
        },
        beforeSize:{
            type:Number,
            default: 0
        },
        decimals:{
            type:Number,
            default:0
        },
        bShowZero:{
            type:Boolean,
            default:true
        },
        lastSymbol:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            timer:'',
            sCount:this.bShowZero ? this.from : '',
            nLoop: 0,
            nIncrement:'',
            nDecimals: this.decimals,
            tempCount:this.from
        }
    },
    watch:{
        to:{
            immediate:true,
            handler(val){
                if((val || val==0)){
                    if(!this.value){
                        const aTo = String(val).split('.');
                        if(aTo.length > 1 && this.nDecimals == 0){
                            this.nDecimals = aTo[1].length;
                        }
                        this.sCount=this.fSplitMoney(Number(val).toFixed(this.nDecimals)) + this.lastSymbol;
                    }
                    else{
                        this.nLoop = 0;
                        this.nIncrement = '';
                        this.nDecimals = this.decimals;
                        this.tempCount = this.from;
                        this.sCount = this.bShowZero ? this.from : '',
                        this.fStartCountup();
                    }
                }
            }
        }
    },
    methods:{
        fStartCountup(){
            if(isNaN(parseFloat(this.to))){
                throw new Error('countup prop to is NaN');
                return;
            }
            if(isNaN(parseFloat(this.from))){
                throw new Error('countup prop from is NaN');
                return;
            }
            if(this.to < this.from){
                throw new Error('countup prop to should be great than from')
                return;
            }
            if(this.timer){
                clearInterval(this.timer);
            }
            this.nLoop = Math.ceil(this.duration/this.speed);
            this.nIncrement = (this.to - this.from)/this.nLoop;
            if(this.nIncrement <=0){
                return;
            }
            setTimeout(() => {
                this.timer = setInterval(this.fUpdateTimer,this.speed);
            },this.delay);
        },
        fUpdateTimer(){
            this.tempCount += this.nIncrement;
            this.nLoop--;
            const sTempCount = this.tempCount.toFixed(this.nDecimals),
                  sizeNum = sTempCount.length,
                  sizeNumBefore = sizeNum - this.nDecimals - 1;
            if(sizeNumBefore >= this.beforeSize){
                this.sCount = this.fSplitMoney(sTempCount) + this.lastSymbol;
            }
            else{
                this.sCount = Array(this.beforeSize-sizeNumBefore + 1).join('0') + this.fSplitMoney(sTempCount) + this.lastSymbol;
            }
            if(this.nLoop <= 0){
               clearInterval(this.timer);
               this.timer = '';
               this.tempCount = this.from;
               this.sCount = this.fSplitMoney(this.to) + this.lastSymbol;
               this.nLoop = 0;
               this.nIncrement = '';
               this.nDecimals = this.decimals;
               this.$emit('input',false);
            }
        },
        fSplitMoney(money){
            money = String(money);
            const aMoney = money.split('.');
            const aSplit = aMoney[0].split('').reverse();
            for(let i=0;i<aSplit.length;i++){
                if(i % 3 == 2){
                    aSplit[i] = ',' + aSplit[i];
                }
            }
            let result = aSplit.reverse().join('');
            if(aMoney.length > 1){
                result += '.' + aMoney[1];
            }
            if(result[0] == ','){
                result = result.slice(1);
            }
            return result;
        }
    }
}
</script>