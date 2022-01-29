import React from 'react';
import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite';

// eslint-disable-next-line arrow-body-style
const ConsitionalBadge = ({condition, children}) =>{
  return condition ? <Badge content={condition}>{children}</Badge> : children;
}

export default function IconBtnControl({
    
    isVisible, 
    iconName,
    tooltip,
    onClick,
    badgeContent,
    ...props
}) {
  return <div className='ml-2' style={{visibility: isVisible? 'visible' : 'hidden'}}>
      <ConsitionalBadge condition={badgeContent}>
          <Whisper
            placement='top'
            delay={0}
            delayHide={0}
            delayShow={0}
            trigger='hover'
            speaker={<Tooltip>{tooltip}</Tooltip>}
          >
              <IconButton
                 {...props}
                 onClick={onClick}
                 circle
                 size='xs'
                 icon={<Icon icon={iconName}/>}
              />
          </Whisper>
      </ConsitionalBadge>
  </div>;
}
