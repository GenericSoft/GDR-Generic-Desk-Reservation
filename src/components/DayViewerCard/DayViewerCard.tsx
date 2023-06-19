import React from 'react';

import UserImage from '../UserImage/UserImage';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

import { userType } from '../../interfaces/User';

import './DayViewerCard.scss';

type DayViewerCardProps = {
  title: string;
  titleColor?: string;
  users: userType[];
};

const DayViewerCard = ({ title, titleColor, users }: DayViewerCardProps) => {
  return (
    <div className="day-viewer-container">
      <h4 className="day-viewer-title" style={{ color: titleColor }}>
        {title}
      </h4>
      <div className="day-viewer-card-users-container">
        {users.length > 0 ? (
          users?.map((user) => (
            <CustomTooltip
              placement="top"
              key={user.userId}
              text={`${user.firstName} ${user.lastName}`}
            >
              <UserImage
                firstName={user.firstName}
                lastName={user.lastName}
                userImage={user.profilePic}
              />
            </CustomTooltip>
          ))
        ) : (
          <p className="day-viewer-card-no-users">No such users!</p>
        )}
      </div>
    </div>
  );
};

export default DayViewerCard;
