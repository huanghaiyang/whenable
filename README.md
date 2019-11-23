# whenable
case when then else

## no if else
`
  when(true).then(() => console.log('the condition is true')).else(() => console.log('the condition is false'))
`

or 

`
when(() => true).then(() => console.log('the condition is true')).else(() => console.log('the condition is false'))
`