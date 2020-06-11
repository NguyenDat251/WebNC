--
-- Constraints for table `debt_reminder`
--
ALTER TABLE `debt_reminder`
  ADD CONSTRAINT `FK_DEBTOR_USER` FOREIGN KEY (`id_debtor`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `FK_OWER_USER` FOREIGN KEY (`id_owner`) REFERENCES `account` (`id`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `FK_HISTORY_RECIPIENT` FOREIGN KEY (`id_recipient`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `FK_HISTORY_USER` FOREIGN KEY (`id_user`) REFERENCES `account` (`id`);

--
-- Constraints for table `moneyaccount`
--
ALTER TABLE `moneyaccount`
  ADD CONSTRAINT `FK_MA_ACCOUNT` FOREIGN KEY (`username`) REFERENCES `account` (`username`);

--
-- Constraints for table `otherbanktransaction`
--
ALTER TABLE `otherbanktransaction`
  ADD CONSTRAINT `otherbanktransaction_ibfk_1` FOREIGN KEY (`BankCode`) REFERENCES `otherbank` (`BankCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `recipients`
--
ALTER TABLE `recipients`
  ADD CONSTRAINT `FK_RECIPIENTS_LINKBANK` FOREIGN KEY (`bank_LinkId`) REFERENCES `linkbanks` (`id_link_bank`);
COMMIT;