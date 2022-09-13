const alreadyUsedInOptions = [2,3]
const selectOptions = ['Select your option','Option1','AlreadySelectedOption2','AlreadySelectedOption3','Option4']

const _alert = (title, text, icon, footer) =>{
    //footer = '<a href="mailto:test@email.com">Email this issue</a>'
    if(typeof footer == "undefined"){
		Swal.fire(
			title,
			text,
			icon
		  )
	} else {
		Swal.fire({
			title:title,
			text:text,
			icon:icon,
			footer:footer
		})
	}
}

const _alert_selectAndYesOrNo = (title, text, selectOptions, alreadyUsedInOptions = []) => {
    Swal.fire({
        title: title,
        text: text,
        width : '30%',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'YES',
        denyButtonText: 'NO',
        input: 'select',
        returnInputValueOnDeny: true, //기본적으로 deny할 때, result.value를 없애버림
        inputOptions: {
            selectOptions: selectOptions
        }
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        console.log(result)
        if(typeof result.value == "undefined" || result.value == 0){
            return _alert("Please Select", "Select it", "error")
        } 
        if(alreadyUsedInOptions.includes(parseInt(result.value))){
            return _alert("Already Used", "It was already used.", "error")
        }
        if (result.isConfirmed) {
            noty(selectOptions[result.value]+" is allowed", "information")
        } else if (result.isDenied) {
            noty(selectOptions[result.value]+" is denied", "error")
        }
      })
}

const _alert_yesOrNo = (title, yesText, noText) => {
    Swal.fire({
        title: title,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: yesText,
        denyButtonText: noText,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Confirmed!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Not confirmed', '', 'info')
        }
    })
}

const _alert_inputTextArea = async (title) =>{
    const { value: textArea } = await Swal.fire({
        input: 'textarea',
        inputLabel: title,
        inputPlaceholder: 'Type your text here...',
        inputAttributes: {
          'aria-label': 'Type your text here'
        },
        showCancelButton: true
      })
      if(typeof textArea == "undefined" || textArea == ""){
        _alert(title, "No Data", "error")
      } else {
        _alert_outputTextArea(title, "", textArea)
      }
      
}

const _alert_outputTextArea = (title, html, output, icon = 'info') => {
    let outputStr = output;
    console.log(output)
    if(Object.prototype.toString.call(output) === '[object Array]'){
        outputStr = `'${output[0]}'`
        for(var i=1; i<output.length; i++) {
            outputStr += "&#13;&#10;'" + output[i] + "'"
        }
    }
    Swal.fire({
        title : title,
        html : html + `<br><textarea class="button" style="width : 50%; height:150px;" readonly>${outputStr}</textarea>`,
        icon: icon,
        showCancelButton : true,
        confirmButtonText: 'Confirm',
    }).then(async (result) =>{
        if(result.isConfirmed) noty(outputStr+" is confirmed", 'success')
        else noty(outputStr+" is not confirmed", 'fail')
    })
}

