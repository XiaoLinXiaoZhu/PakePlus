console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// 添加一个 -webkit-app-region: drag;

window.addEventListener('DOMContentLoaded', () => {
    // 创建拖拽区域
    const dragDiv = document.createElement('div');
    dragDiv.style.position = 'fixed';
    dragDiv.style.top = '0';
    dragDiv.style.left = '0';
    dragDiv.style.width = '100vw';
    dragDiv.style.height = '10%';
    dragDiv.style.maxHeight = '100px';
    dragDiv.style.setProperty('-webkit-app-region', 'drag');
    dragDiv.style.zIndex = '9999';
    dragDiv.style.pointerEvents = 'auto';
    document.body.appendChild(dragDiv);
    
    // 创建窗口控制按钮容器
    const controlsContainer = document.createElement('div');
    controlsContainer.style.position = 'absolute';
    controlsContainer.style.top = '5px';
    controlsContainer.style.left = '5px';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.gap = '5px';
    controlsContainer.style.opacity = '0';
    controlsContainer.style.transition = 'opacity 0.3s';
    controlsContainer.style.setProperty('-webkit-app-region', 'no-drag');
    
    // 创建返回按钮
    const backBtn = createControlButton('←', '#87CEEB', () => {
        try {
            window.history.back();
        } catch (error) {
            console.error('返回上一页失败:', error);
        }
    });
    
    // 创建关闭按钮
    const closeBtn = createControlButton('✕', '#FFA07A', () => {
        try {
            window.close();
        } catch (error) {
            console.error('关闭窗口失败:', error);
        }
    });
    
    // 添加按钮到容器
    controlsContainer.appendChild(backBtn);
    controlsContainer.appendChild(closeBtn);
    
    // 添加容器到拖拽区域
    dragDiv.appendChild(controlsContainer);
    
    // 添加悬停效果
    dragDiv.addEventListener('mouseenter', () => {
        controlsContainer.style.opacity = '1';
    });
    
    dragDiv.addEventListener('mouseleave', () => {
        controlsContainer.style.opacity = '0';
    });
    
    // 辅助函数：创建控制按钮
    function createControlButton(text, bgColor, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.width = '20px';
        button.style.height = '20px';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.backgroundColor = bgColor;
        button.style.color = '#333';
        button.style.border = 'none';
        button.style.borderRadius = '50%';
        button.style.fontSize = '12px';
        button.style.fontWeight = 'bold';
        button.style.cursor = 'pointer';
        button.style.padding = '0';
        button.style.lineHeight = '1';
        button.style.transition = 'transform 0.2s';
        
        // 添加悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
        
        // 添加点击事件
        button.addEventListener('click', clickHandler);
        
        return button;
    }
});

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

document.addEventListener('click', hookClick, { capture: true })
