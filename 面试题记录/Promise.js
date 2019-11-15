/**
 * 
 * @param {*} excecutor 是一个执行函数
 */
function Promise(excecutor){
    let self = this;
    self.status = 'pending';
    self.value = undefined; // 默认成功的值
    self.reason = undefined; // 默认失败的原因
    self.onResolvedCallbacks = []; // 存放then成功的回调
    self.onRejectedCallbacks = []; // 存放then失败的回调
   
    function resolve(value){
        // 成功状态
        if(self.status === 'pending'){
            self.status = 'resolved';
            self.value = value;
            self.onResolvedCallbacks.forEach(function(fn) {
                fn();
            });
        }
    }
    function reject(reason){
        // 失败状态
        if(self.status === 'pending'){
            self.status = 'rejected';
            self.reason = reason;
            self.onRejectedCallbacks.forEach(function (fn) { 
                fn();
             })
        }
    }
    try{
        excecutor(resolve,reject);
    }catch(e){
        reject(e);
    }
}
function resolvePromise(p2,x,resolve,reject){
    // 有可能这里返回的x是别人的promise
    // 尽可能允许其他乱写
    if(p2 === x){
        // 这里应该报一个类型错误，有问题
        return reject(new TypeError('循环引用了'));
    }
    // 看x是不是一个promise,promise应该是一个对象
    let called;
    if(x != null && (typeof x === 'object' || typeof x === 'function')){
        // 可能是promise， {}， 看对象中是否有then方法，如果有就认为是promise了
        try{
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x,function(y){
                    // y可能还是一个promise，再去解析直到返回的是一个普通值
                    if(called) return;
                    called = true;
                    resolvePromise(p2,y,resolve,reject);
                },function(err){
                    reject(err);
                })
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        }
        
    }else{
        // x是一个普通值
        resolve(x);
    }
}
Promise.prototype.then = function(onFulfiled,onRjected){
    onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : function(value){
        return value;
    }
    onRjected = typeof onRjected === 'function' ? onRjected : function(err){
        throw err;
    }
    let self = this;
    let promise2; // 返回的promise
    if(self.status == 'resolved'){
        promise2 = new Promise(function(resolve,reject){
            // 当成功或者失败执行时有异常，那么返回的promise应处于失败状态0
            // x 可能是一个promise， 也可能是一个普通值
            setTimeout(function(){
                try{
                    let x = onFulfiled(self.value);
                    // x可能是别人的promise， 写一个方法统一处理
                    resolvePromise(promise2,x,resolve,reject);
                }catch(e){
                    reject(e);
                }
            })
            
        })
        // onFulfiled(self.value);
    }
    if(self.status == 'rejected'){
        promise2 = new Promise(function(resolve,reject){
            let x = onRjected(self.reason);
            resolvePromise(promise2,x,resolve,reject);
        })
    }

    if(self.status === 'pending'){
        promise2 = new Promise(function(resolve,reject){
            self.onResolvedCallbacks.push(function(){
                let x = onFulfilled(self.value);
                resolvePromise(promise2,x,resolve,reject);
            })
            self.onRejectedCallbacks.push(function(){
                let x = onRjected(self.reason);
                resolvePromise(promise2,x,resolve,reject);
            })
        })
    }
    return promise2;
}
const isPromise =function (value) {
    if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
        if (typeof value.then === 'function') {
            return true;
        }
    } else {
        return false;
    }
}
Promise.all = function(promises.length){
    // promises 是一个promise的数组
    return new Promise(function(resolve,reject){
        let arr = []; // arr是最终返回值的结果
        let indexi = 0; // 设置成功的个数，防止后边的先返回了，设置了arr 下标后，arr长度会变最大的；
        for(let i = 0;i < promises.length; i ++){
            let current = promises[i];
            if (isPromise(current){
                current.then((data) => {
                    indexi++;
                    arr[i] = data;
                    if (indexi == promises.length){
                        resolve(arr);
                    }
                }, reject)
            } else {
                arr[i] = current;
            }
        }
    })
}
// 只要有一个promise成功了，就算成功，如果第一个失败，则认为失败了
Promise.race = function(promises){
    return new Promise(function(resolve,reject){
        for(let i = 0; i < promises.length; i ++){
            promises[i].then(resolve,reject);
        }
    })
}
Promise.resolve = function(value){
    return new Promise(function(resolve,reject){
        resolve(value);
    })
}
Promise.reject = function(reason){
    return new Promise(function(resolve,reject){
        resolve(reason);
    })
}
Promise.resolve.finally = function (cb) {
     return p.then(
         data => Promise.resolve(cb()).then(() => data),
         err => Promise.resolve(cb()).then(() => {
             throw err
         })
     )
}
module.exports = Promise;
