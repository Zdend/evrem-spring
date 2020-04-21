package net.evrem.webapp.service.impl;

import net.evrem.webapp.domain.Note;
import net.evrem.webapp.domain.RemindInfo;
import net.evrem.webapp.repository.RemindInfoRepository;
import net.evrem.webapp.service.RemindInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by t945051 on 6.7.2015.
 */
@Service("remindInfoService")
public class RemindInfoServiceImpl implements RemindInfoService {
    @Autowired
    RemindInfoRepository remindInfoRepository;
    @Override
    public void deleteByNote(Note note) {
        if(note.getRemindInfo() != null){
            remindInfoRepository.delete(note.getRemindInfo());
        }
    }

    @Override
    public void save(RemindInfo remindInfo) {
        remindInfoRepository.save(remindInfo);
    }
}
