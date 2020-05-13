const sum = require('../src/sum')

// toBe 精确相等
test('1、adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

// toEqual 递归检查对象/数组的值
test('2、check value of object', () => {
  const data = { a: 1 }
  data['b'] = 2
  expect(data).toEqual({ a: 1, b: 2 })
})

// not 反向匹配
test('3、adding positive numbers is not zero', () => {
  const a = 1
  const b = 0
  expect(a + b).not.toBe(0)
})

/**
 * toBeNull   只匹配null
 * toBeUndefined 只匹配undefined
 * toBeDefined 与toBeUndefined相反
 * toBeTruthy 匹配任何if真
 * toBeFalsy 匹配任何if假
 */
test('4、null', () => {
  const a = null
  expect(a).toBeNull()
  expect(a).toBeDefined()
  expect(a).not.toBeUndefined()
  expect(a).toBeFalsy()
  expect(a).not.toBeTruthy()
})

test('5、a string', () => {
  const a = 'apple'
  expect(a).not.toBeNull()
  expect(a).not.toBeUndefined()
  expect(a).toBeDefined()
  expect(a).not.toBeFalsy()
  expect(a).toBeTruthy()
})

/**
 * 数字
 * toBeGreaterThan
 * tobeGreaterThanOrEqual
 * toBeLessThan
 * toBeLessThanOrEqual
 * toBe
 * toEqual 也可用于比较对象
 * toBeCloseTo 比较浮点数
 */
test('6、两个浮点数相加', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3)
})

/**
 * 字符串
 * toMatch 正则校验
 */
test('7、there is no I in team', () => {
  expect('team').not.toMatch(/I/)
})

test('8、there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/)
})

/**
 * 数组/可迭代对象
 * toContain
 */
test('9、this list has Marry on it', () => {
  const list = ['Bob', 'Jack', 'Marry', 'Sam']
  expect(list).toContain('Marry')
  expect(new Set(list)).toContain('Marry')
})

/**
 * 函数抛出错误
 * toThrow 参数为抛出的错误内容正则匹配，也可不带参数或Error
 */
test('10、this function throw an error', () => {
  function compileAndroidCode() {
    throw new Error('you are using the wrong JDK')
  }
  expect(compileAndroidCode).toThrow()
  expect(compileAndroidCode).toThrow(Error)
  expect(compileAndroidCode).toThrow('you are using the wrong JDK')
  expect(compileAndroidCode).toThrow(/JDK/)
})

/**
 * 异步回调
 */
test('11、callback: the data is peanut butter', (done) => {
  function fetchData(callback) {
    setTimeout(() => {
      const res = 'peanut butter'
      callback(res)
    }, 10)
  }
  function callback(data) {
    try {
      expect(data).toBe('peanut butter')
      done()
    } catch (error) {
      done(error)
    }
  }

  fetchData(callback)
})

/**
 * Promises
 */
function fetchData(param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (param > 0) {
        resolve('peanut butter')
      } else {
        reject('unexpected res')
      }
    }, 10)
  })
}
//此断言只能测到执行了resolve，如果promise执行了reject，也不会报错，因为没有指定reject的断言
test('12、promise: the data is peanut butter', () => {
  //这是一个走resolve的用例，实际执行的断言数为1
  return fetchData(1).then(
    (data) => {
      expect(data).toBe('peanut butter')
    },
    (err) => {
      console.log(err)
    }
  )
})
// 此断言只能测到执行了resolve，如果promise执行了reject，也不会报错，因为没有指定reject的断言
test('13、catch an error of promise', () => {
  // 这是一个走reject的断言,但实际执行的断言数为0，用例也通过了！！！
  return fetchData(0).then(
    (data) => {
      expect(data).toBe('peanut butter')
    },
    (err) => {
      console.log(err)
    }
  )
})
// 通过指定断言数，对于没有走断言（即漏测）的情况进行报错提示
// test('14、assertions: catch an error of promise', () => {
//   // 指定断言次数为1
//   expect.assertions(1)
//   return fetchData(0).then(
//     (data) => {
//       expect(data).toBe('peanut butter')
//     },
//     (err) => {
//       console.log(err)
//     }
//   )
// })

/**
 * .resolves/.rejects匹配器
 */
test('15、the data goes to resolve', () => {
  return expect(fetchData(1)).resolves.toBe('peanut butter')
})

test('16、an error happened caused reject', () => {
  return expect(fetchData(0)).rejects.toMatch('unexpected')
})

/**
 * async/await
 */
test('17、using async/await in testing', async () => {
  const data = await fetchData(1)
  expect(data).toBe('peanut butter')
})

test('18、using await/await in testing', async () => {
  expect.assertions(1)
  try {
    await fetchData(0)
  } catch (err) {
    expect(err).toMatch('unexpected')
  }
})

test('19、combine async/await with resolves', async () => {
  await expect(fetchData(1)).resolves.toBe('peanut butter')
})

test('20、combine async/await with rejects', async () => {
  await expect(fetchData(0)).rejects.toMatch('unexpected')
})

/**
 * beforeEach/afterEach 多次重复测试
 * beforeAll/afterAll 一次性设置
 */
// 每次测试之前初始化数据
function initData(arr) {
  arr.push('Marry', 'Bob')
}
// 每次测试之后清空数据
function clearData(arr) {
  arr.length = 0
}
// 被测函数
function handleData(arr) {
  return arr.includes('Haha')
}
describe('21、beforeEach/afterEach testing', () => {
  let arrData = []
  beforeEach(() => {
    return initData(arrData)
  })
  afterEach(() => {
    return clearData(arrData)
  })
  test('21-1、testing1', () => {
    arrData.push('Haha')
    expect(handleData(arrData)).toBe(true)
  })
  test('21-2、testing2', () => {
    arrData.push('Lucy')
    expect(handleData(arrData)).toBeFalsy()
  })
})

/**
 * 顶级的beforeEach在describe块级的beforeEach之前被执行
 * 顶级的afterEach在describe块级的afterEach之后执行
 * beforeAll/afterAll同理
 */
// beforeAll(() => console.log('1 - beforeAll'))
// afterAll(() => console.log('1 - afterAll'))
// beforeEach(() => console.log('1 - beforeEach'))
// afterEach(() => console.log('1 - afterEach'))
// test('', () => console.log('1 - test'))
// describe('scoped/nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'))
//   afterAll(() => console.log('2 - afterAll'))
//   beforeEach(() => console.log('2 - beforeEach'))
//   afterEach(() => console.log('2- afterEach'))
//   test('', () => console.log('2 - test'))
// })
/**
 * 上述测试执行的结果为：
 * 1 - beforeAll
 * 1 - beforeEach
 * 1 - test
 * 1 - afterEach
 * 2 - beforeAll
 * 1 - beforeEach
 * 2 - beforeEach
 * 2 - test
 * 2 - afterEach
 * 1 - afterEach
 * 2 - afterAll
 * 1 - afterAll
 */

/**
 * describe和test块的执行顺序：
 * jest会在所有test之前执行测试文件中的所有describe处理程序，
 * 然后依次运行所有test，等待每一个test执行完并整理好才继续往下走
 */
// describe('22、outer', () => {
//   console.log('describe outer-a')

//   describe('describe inner 1', () => {
//     console.log('describe inner 1')
//     test('test 1', () => {
//       console.log('test fore describe inner 1')
//       expect(true).toEqual(true)
//     })
//   })

//   console.log('describe outer-b')

//   test('test 1', () => {
//     console.log('test for describe outer')
//     expect(true).toEqual(true)
//   })

//   describe('describe inner 2', () => {
//     console.log('describe inner 2')
//     test('test for describe inner 2', () => {
//       console.log('test for describe inner 2')
//       expect(false).toEqual(false)
//     })
//   })

//   console.log('describe outer-c')
// })

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2

/**
 * test.only
 * 如果测试失败，第一件要检查的事就是：
 * 当仅运行这条测试时，是否仍失败
 */
// 当使用test.only之后，仅此测试会运行，其他测试都被忽略
// test.only('23、this will be the only test that runs', () => {
//   expect(true).toBe(false)
// })

/**
 * mock：测试代码之间的连接
 */
// 测试函数
test('24、mock data', () => {
  function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index])
    }
  }
  const mockCallback = jest.fn((x) => 42 + x)
  forEach([0, 1], mockCallback)

  // 此mock函数被调用了2次
  expect(mockCallback.mock.calls.length).toBe(2)
  // 第一次调用函数时的第一个参数是0
  expect(mockCallback.mock.calls[0][0]).toBe(0)
  // 第二次调用函数时的第一个参数时1
  expect(mockCallback.mock.calls[1][0]).toBe(1)
  // 第一次函数调用的返回值是42
  expect(mockCallback.mock.results[0].value).toBe(42)
})

/**
 * mock --- API 模拟模块
 */
