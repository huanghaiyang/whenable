# whenable
case when then else

## no if else

<pre>
  <code>
  when(true)
    .then(() => console.log('the condition is true'))
    .else(() => console.log('the condition is false'))
  </code>
</pre>

or 

<pre>
  <code>
  when(() => true)
    .then(() => console.log('the condition is true'))
    .else(() => console.log('the condition is false'))
  </code>
</pre>

or

<pre>
  <code>
  when(() => {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  })
    .then(() => console.log('the condition is true'))
    .else(() => console.log('the condition is false'))
  </code>
</pre>