// 1.1
document.getElementsByTagName('pre')[0].innerText.split(/\n/).map(Number)
	.filter((n,i,a)=>i>0&&a[i-1]<n).length
// 1292

// 1.2
document.getElementsByTagName('pre')[0].innerText.split(/\n/).map(Number)
	.map((n,i,a)=>n+a[i+1]+a[i+2])
	.filter((n,i,a)=>i>0&&a[i-1]<n).length
// 1262