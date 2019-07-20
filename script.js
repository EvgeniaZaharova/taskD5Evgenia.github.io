function start()
{
	setInterval(fall, 1000);
	window.onkeydown = key;
}

function key(k)
{
    if (k.keyCode == 38)
	{
    	circle();
    }

    if (k.keyCode == 40)
	{
    	move(0, 1)
    }

    if (k.keyCode == 37)
	{
    	move(-1, 0)
    }

    if (k.keyCode == 39)
	{
    	move(1, 0)
    }
}

function fall()
{
	land();
	move(0, 1);
}

function circle()
{
	shadow();
	if(type == 't1')
	{
		f = f1[1];
		if(!free())
		{
			f = f1[0];
		}
	} 
	else 
	{
		f = f2[1];
		if(!free())
		{
			f = f2[0];
		}	
	}
	fshow();
};

function move(x, y)
{
	shadow();
	position.top += y;
	position.left += x;
	if(!free())
	{
		position.top -= y;
		position.left -= x;
	}
	fshow();
};

function free()
{
	for(kv in f)
	{
		if(position.left + f[kv].left < 0 || position.left + f[kv].left > 5 )
		{
			return false;
		};

		if (position.top + f[kv].top > 8)
		{
			return false
		};

		for(kvr in fallen)
		{
			if( position.top + f[kv].top == fallen[kvr].top && position.left + f[kv].left == fallen[kvr].left)
			{
				return false
			}
		};

	};
	return true
}

function land()
{
	check = false;
	for(kv in f)
	{
		if (position.top + f[kv].top + 1 > 8)
		{
			check = true;
		};

		for(kvr in fallen)
		{
			if(position.top + f[kv].top + 1 == fallen[kvr].top && position.left + f[kv].left == fallen[kvr].left)
			{
				check = true;
			}
		};

	};
	if(check)
	{
		connect();
		next();
	}
}

function connect()
{
	for(kv in f)
	{
		fallen.push(
		{
			top: f[kv].top + position.top, 
			left: f[kv].left + position.left
		})
	};
}

function next()
{
	if(position.top == 0)
	{
		alert('The End');
	}
	
	position = 
	{
		top: 0, left: 0
	};
	
	if(type == 't1')
	{
		f = f2[0];
		type = 't2';
	} 
	else 
	{
		f = f1[0];
		type = 't1';
	}
	ldelete();
}

function shadow()
{
	for(kv in f)
	{
		id_kv = 'id_'+(f[kv].top + position.top)+(f[kv].left + position.left);
		document.getElementById(id_kv).style.background = 'gray';

	};
}

function fshow()
{
	for(kv in f)
	{
		id_kv = 'id_'+(f[kv].top + position.top)+(f[kv].left + position.left);
		document.getElementById(id_kv).style.background = 'black';
	};
}

function fshadow()
{
	for(kv in fallen)
	{
		id_kv = 'id_'+fallen[kv].top + fallen[kv].left;
		document.getElementById(id_kv).style.background = 'gray';
	};
}

function show()
{
	for(kv in fallen)
	{
		id_kv = 'id_'+fallen[kv].top + fallen[kv].left;
		document.getElementById(id_kv).style.background = 'white';
	};
}

function ldelete()
{
	fshadow();
	for(x = 8; x > 0; x--)
	{
		lcheck = 0;
		for(kv in fallen)
		{
			if(fallen[kv].top == x)
			{
				lcheck++;
			}
		};
		if(lcheck == 6)
		{
			mas = fallen.filter(function(square)
			{
				if(square.top == x)
				{
					return false
				}
				return true
			});
			fallen = mas;
			for(kv in fallen)
			{
				if(fallen[kv].top < x)
				{
					fallen[kv].top++;
				}
			};
			x++;
		};
	};
	show();
};

f1 = 	[ 
				[
					{
						top: 0, left: 0
					}, 
					{
						top: 1, left: 0
					}, 
					{
						top: 1, left: 1
					}, 
					{
						top: 2, left: 1
					}
				],
				[
					{
						top: 1, left: 0
					}, 
					{
						top: 1, left: 1
					}, 
					{
						top: 0, left: 1
					}, 
					{
						top: 0, left: 2
					}
				] 
			];

f2 = 	[ 
				[
					{
						top: 0, left: 0
					}, 
					{
						top: 1, left: 0
					}, 
					{
						top: 1, left: 1
					}, 
					{
						top: 2, left: 0
					}
				],
				[
					{
						top: 1, left: 0
					}, 
					{
						top: 1, left: 1
					}, 
					{
						top: 0, left: 1
					}, 
					{
						top: 1, left: 2
					}
				] 
			];
			
f = f1[0];
type = 't1';

position = 
{
	top: 0, left: 0
};

fallen = [];

window.onload = start;